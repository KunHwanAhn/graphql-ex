module.exports = {
  hello: () => 'Hello world!',
  totalPhotos: (parent, args, { db }) => db.collection('photos').estimatedDocumentCount(),
  allPhotos: (parent, args, { db }) =>
    db
      .collection('photos')
      .find()
      .toArray(),
}
