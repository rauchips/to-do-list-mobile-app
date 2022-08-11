const mongoose = require('mongoose')

const usersShema = mongoose.Schema({
  user: String
})

module.exports = mongoose.model('users', usersShema)
