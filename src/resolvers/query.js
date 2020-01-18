const { photos } = require('../dummy')

module.exports = {
  hello: () => 'Hello world!',
  totalPhotos: () => photos.length,
  allPhotos: () => photos,
}
