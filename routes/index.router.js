const express = require('express')
const router = express.Router()
const { addToDo } = require('../routes/index.controller')

// ADD TODO LIST
router.post('/add', addToDo)

module.exports = router
