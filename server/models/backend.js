const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')


// Mongoose schema for backends
const BackendSchema = new Schema({
  // name of the backend
  name: String,
  // remote address of the backend
  addr: String,
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
    addr: String!
  }

  type Backend {
    id: String!
    name: String!
    addr: String!
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
  createBackend(input: BackendInput!): Backend
  deleteBackend(id: String!): Backend
  refreshBackend(id: String!): Backend
`

module.exports = {
  model: BackendModel,
  type: BackendType,
  query: BackendQuery,
  mutation: BackendMutation
}
