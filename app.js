const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')

const indexRouter = require('./routes/index.router')

const app = express()

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)

module.exports = app
