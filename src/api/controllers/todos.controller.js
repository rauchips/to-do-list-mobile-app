const moment = require('moment')

const {
  createTodo,
  findToDos,
  changeToDo,
  changeManyToDos,
  removeToDo,
  removeManyToDos
} = require('../services/todos.service')
const { getUser } = require('../services/users.service')

async function addToDo (req, res, next) {
  try {
    const { title, description, deadline, user } = req.body
    const date = new Date(deadline)

    // Check if the user exists
    if (!await getUser(user)) return res.status(400).json({ message: 'This user does not exist.' })

    // Validate if req.body is empty
    if (!title || !description || !date || !user) {
      return res.status(400).json({ message: 'ToDo could be missing a title, desription, deadline or user.' })
    }

    // Validate deadline is later than the current time
    if (moment(date).isBefore(new Date())) {
      return res.status(400).json({ message: 'Select current date and onwards.' })
    }

    // Create a new todo list
    await createTodo(req.body)
      .then((todo) => {
        return res.status(201).json(todo)
      })
      .catch(error => console.error(error))
  } catch (error) {
    console.error(error)
    next(error)
  }
}

async function getToDos (req, res, next) {
  try {
    findToDos({ user: req.params.id })
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
    changeToDo({ _id: req.params.id }, req.body)
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

    await changeManyToDos({ user })
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
    await removeToDo({ _id: req.params.id })
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

    await removeManyToDos({ user })
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
