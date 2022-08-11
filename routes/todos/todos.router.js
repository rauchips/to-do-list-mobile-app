const express = require('express')
const router = express.Router()
const {
  addToDo,
  getToDos,
  patchToDo,
  patchManyToDo,
  delToDo,
  delManyToDo
} = require('./todos.controller')

// ADD TODO LIST
router.post('/add', addToDo)

// GET ALL TODOs
router.get('/getAll/:id', getToDos)

// PATCH ONE TODO
router.patch('/patchOne/:id', patchToDo)

// PATCH MANY COMPLETE TODO
router.patch('/patchMany', patchManyToDo)

// DELETE ONE TODO
router.delete('/delOne/:id', delToDo)

// DELETE MANY TODO
router.delete('/delMany', delManyToDo)

module.exports = router
