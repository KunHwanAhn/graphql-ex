const { ApolloServer } = require('apollo-server')
const { readFileSync } = require('fs')
const { resolve } = require('path')

const typeDefs = readFileSync(resolve(__dirname, './graphql/typeDefs.graphql'), 'UTF-8')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`)
})
