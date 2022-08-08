const express = require('express')
const router = express.Router()
const {
  addToDo,
  getToDos,
  getToDo,
  patchToDo,
  delToDo,
  delManyToDo
} = require('../routes/index.controller')

// ADD TODO LIST
router.post('/add', addToDo)

// GET ALL TODOs
router.get('/getAll', getToDos)

// GET ONE TODO
router.get('/getOne/:id', getToDo)

// PATCH ONE TODO
router.patch('/putOne/:id', patchToDo)

// DELETE ONE TODO
router.delete('/delOne/:id', delToDo)

// DELETE MANY TODO
router.delete('/delMany/', delManyToDo)

module.exports = router
