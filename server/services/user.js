const UserModel = require('../models/user').model
const ModelModel = require('../models/model').model
const crypto = require('crypto')
const Promise = require('bluebird')


const cookPassword = (key, salt) => {
  const hash = crypto.createHash('sha512')
  const mid = key.length >> 1
  return hash.update(key.slice(0, mid))
    .update(salt)
    .update(key.slice(mid))
    .digest('base64')
}

const UserResolver = {
  signup: Promise.coroutine(function* ({ username, password }, req) {
    const salt = crypto.randomBytes(64).toString('base64')
    const newUser = {
      salt, username, password: cookPassword(password, salt)
    }
    const res = yield UserModel.findOne({ username })
    if (res) {
      return { msg: 'USERNAME_DUPLICATE', user: null }
    } else {
      const user = yield (new UserModel(newUser)).save()
      user.id = user._id.toString()
      req.session.userId = user.id
      return { msg: 'SIGNUP_SUCCESS', user }
    }
  }),
  login: ({ username, password }, req) => {
    return UserModel.findOne({ username })
      .then((user) => {
        if (user && user.password === cookPassword(password, user.salt)) {
          user.id = user._id.toString()
          req.session.userId = user.id
          return { msg: 'LOGIN_SUCCESS', user }
        } else {
          return { msg: 'LOGIN_FAILURE', user: null }
        }
      })
  },
  logout: ({ id }, req) => {
    req.session.destroy()
    return UserModel.findById(id)
      .then(res => (
        res ? { msg: 'LOGOUT_SUCCESS', user: res }
            : { msg: 'LOGOUT_FAILURE', user: null }
      ))
  }
}

module.exports = {
  resolver: UserResolver
}
