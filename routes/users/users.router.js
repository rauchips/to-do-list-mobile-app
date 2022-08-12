const express = require('express')
const router = express.Router()
const {
  addUser
} = require('./users.controller')

// ADD USER
router.post('/create', addUser)

module.exports = router
