const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')

// Mongoose schema for backends
const BackendSchema = new Schema({
  // name of the backend
  name: String,
  // remote address of the backend
  remote: String,
  // running status
  status: String,
  // provided service
  service: String
})
// Mongoose model for backends
const BackendModel = mongoose.model('Backend', BackendSchema)

// GraphQL type for backends
const BackendType = `
  input BackendInput {
    name: String!
    remote: String!
  }

  type Backend {
    name: String!
    remote: String!
    status: String!
    service: String!
  }
`
// related query for backends
const BackendQuery = `
  backendList: [Backend]!
`
// related mutations for backends
const BackendMutation = `
  createBackend(input: BackendInput): Backend
`
// GraphQL resolvers for backends
const BackendResolver = {
  backendList: () => {
    return BackendModel.find()
  },
  createBackend: Promise.coroutine(function* ({ input }) {
    const { name, remote } = input
    const backend = {
      name,
      remote,
      status: '启动中',
      service: '未知'
    }
    yield (new BackendModel(backend)).save()
    return backend
  })
}

module.exports = {
  model: BackendModel,
  type: BackendType,
  query: BackendQuery,
  mutation: BackendMutation,
  resolver: BackendResolver
}
