const axios = require('axios')
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
  async addFakeUsers(parent, { count }, { db }) {
    const {
      data: { results },
    } = await axios.get(`https://randomuser.me/api?results=${count}`)

    const users = results.map(user => ({
      githubLogin: user.login.username,
      name: `${user.name.first} ${user.name.last}`,
      avatar: user.picture.thumbnail,
      githubToken: user.login.sha1,
    }))

    await db.collection('users').insertMany(users)

    return users
  },
  async fakeUserAuth(parent, { githubLogin }, { db }) {
    const user = await db.collection('users').findOne({ githubLogin })

    if (!user) {
      throw new Error(`Cannot find user with githubLogin "${githubLogin}"`)
    }

    return {
      token: user.githubToken,
      user,
    }
  },
  async postPhoto(parent, args, { db, currentUser }) {
    if (!currentUser) {
      return new UserInputError('only an authorized user can post a photo')
    }

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
      userId: currentUser.githubLogin,
      created: new Date(),
    }

    const { insertedId } = await db.collection('photos').insertOne(newPhoto)
    newPhoto._id = insertedId

    return newPhoto
  },
}
