const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const _ = require('lodash')

const Backend = require('../models/backend')
const Step = require('../models/step')
const Model = require('../models/model')
const User = require('../models/user')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

  ${Backend.type}
  ${Step.type}
  ${Model.type}
  ${User.type}

  type Query {
    ${Backend.query}
    ${Step.query}
    ${Model.query}
  }

  type Mutation {
    ${Backend.mutation}
    ${Model.mutation}
    ${User.mutation}
  }
`)

// The root provides a resolver function for each API endpoint
const root = _.merge(
  require('../services/backend').resolver,
  require('../services/step').resolver,
  require('../services/model').resolver,
  require('../services/user').resolver
)

module.exports = debug => (graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: debug
}))
