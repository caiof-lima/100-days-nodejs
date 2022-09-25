const mongoose = require('mongoose');
const { store } = require('../service/heroService')

async function save(data) {
    try {
        const heroData = {
            name: data.name ?? null,
            power: data.power ?? null,
            shows_in: data.shows_in ?? [],
            is_dead: data.is_dead ?? false
        }

        const response = await store(heroData)

        return {
            success: true,
            message: 'Hero stored successfully!'
        }

        
    } catch (error) {
        return {
            success: false,
            message: error instanceof mongoose.Error.ValidationError
                ? error.message
                : 'Not possible to store hero, try again later...'
        };
    }
}

module.exports = {
    save
}