const Hero = require('../models/Hero');

async function store(userData) {
    const hero = new Hero(userData);
    const response = await hero.save({
        validateBeforeSave: true
    });

    return response;
}

module.exports = {
    store
}