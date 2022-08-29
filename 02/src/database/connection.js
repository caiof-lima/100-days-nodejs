const { host, port } = require('../../environment')
const mongoose = require('mongoose')

async function connect() {
    await mongoose.connect(`mongodb://${host}:${port}/heroes`)
}

module.exports = {
    connect
}