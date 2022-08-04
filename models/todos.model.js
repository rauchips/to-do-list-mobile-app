const mongoose = require('mongoose')

const todosSchema = mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  status: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('ToDo', todosSchema)
