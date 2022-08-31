/* eslint-disable no-undef */

const ToDoModel = require('../models/todos.model')

class ToDoService {
  static async createTodo (query) {
    // Create a new todo list
    return await ToDoModel.create(query)
  }

  static async findToDos (query) {
    return await ToDoModel.find(query)
      .lean()
      .sort({ _id: -1 })
      .select(['title', 'description', 'deadline', 'status', 'user'])
  }

  static async changeToDo (query, body) {
    return await ToDoModel.findByIdAndUpdate(query, body, { new: true })
      .lean()
      .select(['title', 'description', 'deadline', 'status', 'user'])
  }

  static async changeManyToDos (query) {
    return await ToDoModel.updateMany(query, { status: true }, { multi: true, new: true })
  }

  static async removeToDo (query) {
    return await ToDoModel.deleteOne(query)
  }

  static async removeManyToDos (query) {
    return await ToDoModel.deleteMany(query)
  }
}

module.exports = ToDoService
