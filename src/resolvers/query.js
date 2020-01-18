const { getCollection } = require('./utils')

module.exports = {
  hello: () => 'Hello world!',
  me: (parent, args, { currentUser }) => currentUser,
  async totalPhotos(parent, args, { db }) {
    return await db.collection('photos').estimatedDocumentCount()
  },
  async allPhotos(parent, args, { db }) {
    return await getCollection(db, 'photos')
  },
  async totalUsers(parent, args, { db }) {
    return await db.collection('users').estimatedDocumentCount()
  },
  async allUsers(parent, args, { db }) {
    return await getCollection(db, 'users')
  },
}
