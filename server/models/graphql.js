const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const Promise = require('bluebird')
const _ = require('lodash')

const Backend = require('../models/backend')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  ${Backend.type}

  type Query {
    ${Backend.query}
  }

  type Mutation {
    ${Backend.mutation}
  }
`);

// The root provides a resolver function for each API endpoint

const root = _.merge(
  Backend.resolver
);

module.exports = (debug) => (graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: debug,
}))
