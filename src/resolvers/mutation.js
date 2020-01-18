const { getCollection } = require('./utils')
const { UserInputError } = require('apollo-server-express')

module.exports = {
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
