const { UserInputError } = require('apollo-server-express')
const { getCollection } = require('./utils')
const { authorizeWithGithub } = require('../lib/github')

module.exports = {
  async githubAuth(parent, { code }, { db }) {
    const {
      accessToken: githubToken,
      message,
      avatar_url: avatar,
      login: githubLogin,
      name,
    } = await authorizeWithGithub({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    })

    if (message) {
      throw new Error(message)
    }

    const latestUserInfo = {
      name,
      githubLogin,
      githubToken,
      avatar,
    }

    const {
      ops: [user],
    } = await db.collection('users').replaceOne({ githubLogin }, latestUserInfo, { upsert: true })

    return { user, token: githubToken }
  },
  async postPhoto(parent, args, { db }) {
    const users = await getCollection(db, 'users')

    if (users.length === 0) {
      return new UserInputError(`There is no user, you have to register a new user`)
    }

    const { input } = args
    const { githubUser } = input

    if (!users.some(user => user.githubLogin === githubUser)) {
      return new UserInputError(`There is no user, [${githubUser}]`, {
        invalidArgs: githubUser,
      })
    }

    const newPhoto = {
      ...input,
      created: new Date(),
    }

    const { insertedIds } = await db.collection('photos').insert(newPhoto)
    newPhoto._id = insertedIds[0]

    return newPhoto
  },
}
