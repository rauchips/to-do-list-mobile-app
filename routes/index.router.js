const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.end('to-do list mobile app')
})

module.exports = router
