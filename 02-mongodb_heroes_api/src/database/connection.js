const env = require('../../environment')
const mongoose = require('mongoose')

async function connect() {
    await mongoose.connect(
        `mongodb://${env.username}:${env.password}@${env.host}:${env.port}/${env.database}`
    );
}

module.exports = {
    connect
}