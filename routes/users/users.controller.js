const { v4: uuidv4 } = require('uuid')

const User = require('../../models/users.model')

async function addUser (req, res, next) {
  try {
    // Create a new user
    User.create({ user: uuidv4() })
      .then((user) => res.status(201).json(user))
      .catch(error => console.error(error))
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
  addUser
}
