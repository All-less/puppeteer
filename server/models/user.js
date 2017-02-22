const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  password: String,
  salt: String
})
const UserModel = mongoose.model('User', UserSchema)

const UserType = `
  type User {
    id: String!,
    username: String!
  }

  type UserRes {
    # the result of login or signup
    msg: String!
    # when success, a populated will be returned
    user: User
  }
`

const UserMutation = `
  # if success, a populated User will be returned

  signup(username: String!, password: String!): UserRes
  login(username: String!, password: String!): UserRes
  logout(id: String!): UserRes
`

module.exports = {
  model: UserModel,
  type: UserType,
  mutation: UserMutation
}
