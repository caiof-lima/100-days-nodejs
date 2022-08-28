const { host, port } = require('../../environment')
const mongoose = require('mongoose')

export async function connect() {
    await mongoose.connect(`mongodb://${host}:${port}/heroes`)
}