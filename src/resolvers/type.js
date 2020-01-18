const { GraphQLScalarType } = require('graphql')
const { getCollection } = require('./utils')

module.exports = {
  Photo: {
    id: parent => parent._id,
    url: parent => `http://yoursite.com/img/${parent._id}.jpg`,
    async postedBy(parent, args, { db }) {
      return await db.collection('users').findOne({ githubLogin: parent.userId })
    },
    async taggedUsers(parent, args, { db }) {
      const tags = await getCollection(db, 'tags', { photoId: parent._id })
      const users = await getCollection(db, 'users')

      return tags.map(tag => tag.userId).map(userId => users.find(user => user.githubLogin === userId))
    },
  },
  User: {
    async postedPhotos(parent, args, { db }) {
      return await getCollection(db, 'photos', { githubUser: parent.githubLogin })
    },
    async inPhotos(parent, args, { db }) {
      const tags = await getCollection(db, 'tags', { userId: parent.id })
      const photos = await getCollection(db, 'photos')

      return tags.map(tag => tag.photoId).map(photoId => photos.find(photo => photo.id === photoId))
    },
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value.',
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value,
  }),
}
