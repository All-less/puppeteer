const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ModelSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  steps: [{
    id: Number,
    prev: Number,
    next: Number,
    name: String,
    phase: String,
    backend: { type: Schema.Types.ObjectId, ref: 'Backend' },
    config: String, // JSON encoded string
    configDef: String // same as above
  }]
})
const ModelModel = mongoose.model('Model', ModelSchema)

const ModelType = `
  type StepSpec {
    id: Int!
    prev: Int!
    next: Int!
    name: String!
    phase: String!
    backend: String!
    config: String!
    configDef: String!
  }

  input StepSpecInput {
    id: Int!
    prev: Int!
    next: Int!
    name: String!
    phase: String!
    backend: String!
    config: String!
    configDef: String!
  }

  input ModelInput {
    name: String!
    steps: [StepSpecInput]!
  }

  type Model {
    id: Int!
    name: String!
    steps: [StepSpec]!
  }
`

const ModelQuery = `
  modelList(userId: String!): [Model]!
`

const ModelMutation = `
  renameModel(id: Int!, name: String!): Model
  createModel(model: ModelInput!): Model
  updateModel(id: Int!, model: ModelInput!): Model
`

module.exports = {
  model: ModelModel,
  type: ModelType,
  query: ModelQuery,
  mutation: ModelMutation
}
