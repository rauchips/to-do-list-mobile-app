const mongoose = require('mongoose')

const db = process.env.MongoURI

async function connectDB () {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    return console.log('Connected to MongoDB Atlas')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
