const { getCollection } = require('./utils')

module.exports = {
  hello: () => 'Hello world!',
  async totalPhotos(parent, args, { db }) {
    return await db.collection('photos').estimatedDocumentCount()
  },
  async allPhotos(parent, args, { db }) {
    return await getCollection(db, 'photos')
  },
}
