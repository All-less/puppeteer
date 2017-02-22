const mongoose = require('mongoose')
const Schema = mongoose.Schema


const StepSchema = new Schema({
  backend: { type: Schema.Types.ObjectId, ref: 'Backend' },
  name: String,
  phase: String,
  config: String
})
const StepModel = mongoose.model('Step', StepSchema)

const StepType = `
  type Step {
    name: String!
    phase: String!
    config: String!

    # the if of backend
    backend: String!
  }
`
const StepQuery = `
  stepList: [Step]!
`

module.exports = {
  model: StepModel,
  type: StepType,
  query: StepQuery
}
