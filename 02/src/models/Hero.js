import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
    name: String,
    power: String,
    shows_in: Array,
    is_dead: Boolean
})

const Hero = mongoose.model('Hero', heroSchema)

export default Hero