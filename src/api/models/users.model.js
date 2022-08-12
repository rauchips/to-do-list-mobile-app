const mongoose = require('mongoose')

const usersShema = mongoose.Schema({
  user: String
}, { timestamps: true })

module.exports = mongoose.model('users', usersShema)
