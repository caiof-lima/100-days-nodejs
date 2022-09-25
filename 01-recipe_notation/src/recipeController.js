const repository = require('./recipeRepository')

class RecipeController {
    async create(recipeName, description = null, notation) {
        const contents = await repository.getDatabaseContent()
        const id = recipeName.replace(/ /g, '_').toLowerCase()
        const [validate] = contents.filter(recipe => recipe.id === id)
        if (!validate) {    // first we check if recipe already exists
            const recipe = {
                id,
                name: recipeName,
                description: description ?? '',
                notations: [notation]
            }

            const resultSave = await repository.saveDatabaseData(recipe)

            if (resultSave) {
                return {
                    success: true,
                    message: 'Recipe note created successfully!'
                }
            } else {
                return {
                    success: false,
                    message: 'Not possible to save notation and recipe :('
                }
            }

        } else { // if exists just a notation or update the description
            const updated = {
                id: validate.id,
                name: validate.name,
                description: description ?? validate.description,
                notations: [
                    ...validate.notations,
                    notation
                ]
            }

            const resultUpdate = await repository.updateDatabaseData(updated, validate.id)

            if (resultUpdate) {
                return {
                    success: true,
                    message: 'Recipe and note created successfully!'
                }
            } else {
                return {
                    success: false,
                    message: 'Not possible to save notation and recipe :('
                }
            }
        }

    }

    async show(recipe = null) {
        if (recipe) {
            const resultSearch = await repository.show(recipe)
            if (resultSearch) {
                console.table(resultSearch)
                return {
                    success: true
                }
            } else {
                return {
                    success: false,
                    message: 'No recipes are found with this id :/'
                }
            }
        } else {
            const result = await repository.getDatabaseContent()
            console.table(result)
            return {
                success: true
            }
        }
    }
}

module.exports = new RecipeController()