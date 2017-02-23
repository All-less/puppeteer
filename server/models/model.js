const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ModelSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  nodes: String,
  links: String
})
const ModelModel = mongoose.model('Model', ModelSchema)

const ModelType = `
  type Model {
    _id: String!
    name: String!
    nodes: String!
    links: String!
  }

  input ModelInput {
    name: String!
    nodes: String!
    links: String!
  }
`

const ModelQuery = `
  modelList(userId: String!): [Model]!
`

const ModelMutation = `
  createModel(userId: String, model: ModelInput!): Model
  updateModel(id: String!, model: ModelInput!): Model
  deleteModel(id: String!): Model
  runModel(model: ModelInput!): String  # return error message
`

module.exports = {
  model: ModelModel,
  type: ModelType,
  query: ModelQuery,
  mutation: ModelMutation
}
