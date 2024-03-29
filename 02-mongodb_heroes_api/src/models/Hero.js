const { model, Schema } = require("mongoose");

const heroSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'The name field must have minimum 3 characters, got {VALUE}'],
        maxLength: 25,
        
    },
    power: {
        type: String,
        required: true,
        minLength: [3, 'The power field must have minimum 3 characters, got {VALUE}'],
        maxLength: 25,
        
    },
    shows_in: {
        type: [String],
        required: true,
        minLength: 0
    },
    is_dead: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    collection: 'heroes'
})

const Hero = model('Hero', heroSchema)

module.exports = Hero