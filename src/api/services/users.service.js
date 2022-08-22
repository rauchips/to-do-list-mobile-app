const { v4: uuidv4 } = require('uuid')

const UserModel = require('../models/users.model')

class UserService {
  static async createUser () {
    const user = await UserModel.create({ user: uuidv4() })
    return user
  }

  static async getUser (query) {
    return await UserModel.findOne({ _id: query })
  }
}

module.exports = UserService
