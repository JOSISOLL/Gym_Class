const mongoose = require('mongoose')

const Schema = mongoose.Schema
const sessionSchema = new Schema({
    title: String,
    description: String,
    time: String,
    day: String,
    max_people: Number
})

module.exports = mongoose.model('session', sessionSchema, 'sessions')