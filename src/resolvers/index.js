const Query = require('./query')
const Mutation = require('./mutation')
const Type = require('./type')

module.exports = {
  Query,
  Mutation,
  ...Type,
}
