const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { readFileSync } = require('fs')
const { resolve } = require('path')

const typeDefs = readFileSync(resolve(__dirname, './graphql/typeDefs.graphql'), 'UTF-8')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express()
const port = 4000
server.applyMiddleware({ app })

app.listen({ port }, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
})
