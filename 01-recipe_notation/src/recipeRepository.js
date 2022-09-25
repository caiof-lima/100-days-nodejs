const { readFile, writeFile } = require('fs/promises')
const path = require('path')

class RecipeRepository {
    constructor() {
        this.databasePath = path.join(__dirname, 'database/database.json')
    }

    async getDatabaseContent() {
        const result = await readFile(this.databasePath)
        return JSON.parse(result.toString())
    }

    async saveDatabaseData(data) {
        try {
            const content = await this.getDatabaseContent()
            const newContent = [
                ...content,
                data
            ]

            await writeFile(this.databasePath, JSON.stringify(newContent))
            return true;

        } catch (error) {
            console.error('An erro has occur during saving notation', error.message)
            return false
        }
    }

    async updateDatabaseData(data, id) {
        try {
            const content = await this.getDatabaseContent()
            const filtered = content.filter(rcp => rcp.id !== id)

            const newContent = [
                ...filtered,
                data
            ]

            await writeFile(this.databasePath, JSON.stringify(newContent))
            return true

        } catch (error) {
            console.error('An error has occur during saving notation', error.message)
            return false
        }
    }

    async show(id) {
        const content = await this.getDatabaseContent()

        const [filtered] = content.filter(item => item.id === id)

        return filtered
    }
}

module.exports = new RecipeRepository()