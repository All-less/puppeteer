const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const Promise = require('bluebird')
const _ = require('lodash')

const Backend = require('../models/backend')
const Step = require('../models/step')


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  type JsonString {
    content: String!
  }

  ${Backend.type}
  ${Step.type}

  type Query {
    ${Backend.query}
    ${Step.query}
  }

  type Mutation {
    ${Backend.mutation}
  }
`);

// The root provides a resolver function for each API endpoint
const root = _.merge(
  require('../services/backend').resolver,
  require('../services/step').resolver
);

module.exports = (debug) => (graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: debug,
}))
