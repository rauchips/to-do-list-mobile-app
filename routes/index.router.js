const express = require('express')
const router = express.Router()
const { addToDo, getToDos, getToDo } = require('../routes/index.controller')

// ADD TODO LIST
router.post('/add', addToDo)

// GET ALL TODOs
router.get('/getAll', getToDos)

// GET ONE TODO
router.get('/getOne/:id', getToDo)

module.exports = router
