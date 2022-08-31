const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
require('dotenv').config()

const todoRouter = require('./api/routes/todos.router')
const userRouter = require('./api/routes/users.router')

const connectDB = require('./config/db.config')

const app = express()

connectDB()

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1/todo', todoRouter)
app.use('/api/v1/user', userRouter)

module.exports = app
