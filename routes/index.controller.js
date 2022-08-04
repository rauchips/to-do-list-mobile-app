const ToDo = require('../models/todos.model')
const moment = require('moment')

async function addToDo (req, res, next) {
  try {
    const { title, description, deadline } = req.body

    const date = new Date(deadline)

    // Validate if req.body is empty
    if (!title || !description || !date) {
      return res.status(400).json({ message: 'ToDo could be missing a title, desription or deadline.' })
    }

    // Validate deadline is later than the current time
    if (moment(date).isBefore(new Date())) {
      return res.status(400).json({ message: 'Select current date and onwards.' })
    }

    // Create a new todo list
    ToDo.create(req.body)
      .then((todo) => res.status(201).json(todo))
      .catch(error => console.error(error))
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
  addToDo
}
