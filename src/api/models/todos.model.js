const mongoose = require('mongoose')

const todosSchema = mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  status: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users'
  }
}, { timestamps: true })

module.exports = mongoose.model('todos', todosSchema)
