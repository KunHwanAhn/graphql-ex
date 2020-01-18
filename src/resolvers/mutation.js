const { UserInputError } = require('apollo-server-express')
const { photos, users } = require('../dummy')

let photoIdIndex = photos.length

module.exports = {
  postPhoto(parent, args) {
    const { input } = args
    const { githubUser } = input

    if (!users.some(user => user.githubLogin === githubUser)) {
      return new UserInputError(`There is no user, [${githubUser}]`, {
        invalidArgs: githubUser,
      })
    }

    const newPhoto = {
      id: photoIdIndex++,
      ...input,
      created: new Date(),
    }

    photos.push(newPhoto)
    return newPhoto
  },
}
