const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const _ = require('lodash')

const Backend = require('../models/backend')
const Step = require('../models/step')
const Model = require('../models/model')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

  type JsonString {
    content: String!
  }

  ${Backend.type}
  ${Step.type}
  ${Model.type}

  type Query {
    ${Backend.query}
    ${Step.query}
    ${Model.query}
  }

  type Mutation {
    ${Backend.mutation}
    ${Model.mutation}
  }
`)

// The root provides a resolver function for each API endpoint
const root = _.merge(
  require('../services/backend').resolver,
  require('../services/step').resolver,
  require('../services/model').resolver
)

module.exports = debug => (graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: debug
}))
