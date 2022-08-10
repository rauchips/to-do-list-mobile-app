const { uuid } = require('uuidv4')
const mongoose = require('mongoose')

const usersShema = mongoose.Schema({
  user: {
    type: String,
    default: uuid()
  }
})

module.exports = mongoose.model('users', usersShema)
