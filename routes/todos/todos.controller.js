const ToDo = require('../../models/todos.model')
const moment = require('moment')

async function addToDo (req, res, next) {
  try {
    const { title, description, deadline, user } = req.body

    const date = new Date(deadline)

    // Validate if req.body is empty
    if (!title || !description || !date || !user) {
      return res.status(400).json({ message: 'ToDo could be missing a title, desription, deadline or user.' })
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

async function getToDos (req, res, next) {
  try {
    await ToDo.find({ user: req.params.id })
      .lean()
      .sort({ _id: -1 })
      .select(['title', 'description', 'deadline', 'status', 'user'])
      .then(todos => {
        if (!todos.length) {
          return res.status(400).json({ message: 'There are no tasks for this user.' })
        }
        return res.status(200).json(todos)
      })
      .catch(error => console.error(error))
  } catch (error) {
    console.error(error)
    next(error)
  }
}

async function patchToDo (req, res, next) {
  try {
    await ToDo.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .lean()
      .select(['title', 'description', 'deadline', 'status', 'user'])
      .then(todo => {
        if (!todo) return res.status(400).json({ message: 'This task does not exist.' })

        // Validate deadline is later than the current time
        const date = new Date(req.body.deadline)
        if (moment(date).isBefore(new Date())) {
          return res.status(400).json({ message: 'Select current date and onwards.' })
        }
        return res.status(200).json(todo)
      })
      .catch(error => console.error(error))
  } catch (error) {
    console.error(error)
    next(error)
  }
}

async function patchManyToDo (req, res, next) {
  try {
    const { user } = req.body

    await ToDo.updateMany({ user }, { status: true }, { multi: true, new: true })
      .then(todo => {
        if (!todo.modifiedCount) return res.status(400).json({ message: 'This task does not exist.' })

        return res.status(200).json({ message: 'Tasks status updated successfully.' })
      })
      .catch(error => console.error(error))
  } catch (error) {
    console.error(error)
    next(error)
  }
}

async function delToDo (req, res, next) {
  try {
    await ToDo.deleteOne({ _id: req.params.id })
      .then(todo => {
        if (!todo.deletedCount) return res.status(400).json({ message: 'Task does not exist' })

        return res.status(200).json({ message: 'Task deleted successfully.' })
      })
      .catch(error => console.error(error))
  } catch (error) {
    console.error(error)
    next(error)
  }
}

async function delManyToDo (req, res, next) {
  try {
    const { user } = req.body

    await ToDo.deleteMany({ user })
      .then(todo => {
        if (!todo.deletedCount) return res.status(400).json({ message: 'Tasks do not exist' })

        return res.status(200).json({ message: 'Tasks deleted successfully.' })
      })
      .catch(error => console.error(error))
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
  addToDo,
  getToDos,
  patchToDo,
  patchManyToDo,
  delToDo,
  delManyToDo
}
