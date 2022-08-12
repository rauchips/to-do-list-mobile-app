const express = require('express')
const router = express.Router()
const {
  addToDo,
  getToDos,
  patchToDo,
  patchManyToDo,
  delToDo,
  delManyToDo
} = require('../controllers/todos.controller')

// ADD TODO LIST
router.post('/create', addToDo)

// GET ALL TODOs
router.get('/read/:id', getToDos)

// PATCH ONE TODO
router.patch('/update-one/:id', patchToDo)

// PATCH MANY COMPLETE TODO
router.patch('/update-many', patchManyToDo)

// DELETE ONE TODO
router.delete('/delete-one/:id', delToDo)

// DELETE MANY TODO
router.delete('/delete-many', delManyToDo)

module.exports = router
