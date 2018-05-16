const mongoose = require('mongoose')

const Schema = mongoose.Schema

const regSchema = new Schema({
    sessionId: String,
    username: String,
    phonenumber : String
})

module.exports = mongoose.model('reg', regSchema, 'session_reg')
