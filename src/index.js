const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const { MongoClient } = require('mongodb')

require('dotenv').config()

const typeDefs = readFileSync(resolve(__dirname, './graphql/typeDefs.graphql'), 'UTF-8')
const resolvers = require('./resolvers')

;(async () => {
  const MONGO_DB_URL = process.env.MONGO_DB_URL
  let db

  try {
    const client = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    db = client.db()
  } catch (error) {
    console.log(`
      Mongo DB Host not found!
      please add DB_HOST environment variable to .env file

      exiting...
    `)
    process.exit(1)
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({ db }),
  })

  const app = express()
  const port = 4000
  server.applyMiddleware({ app })

  app.listen({ port }, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  })
})()
