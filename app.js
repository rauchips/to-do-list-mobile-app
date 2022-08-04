const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index.router')

const app = express()

const db = require('./config/db').MongoURI

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('Connected to MongoDB Atlas')).catch(err => console.log(err))

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)

module.exports = app
