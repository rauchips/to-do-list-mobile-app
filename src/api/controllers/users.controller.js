const { createUser } = require('../services/users.service')

async function addUser (req, res, next) {
  try {
    await createUser()
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
