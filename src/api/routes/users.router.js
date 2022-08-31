const express = require('express')
const router = express.Router()
const {
  addUser
} = require('../controllers/users.controller')

// ADD USER
router.post('/create', addUser)

module.exports = router
