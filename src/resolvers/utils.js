const getCollection = async (db, collection, query) => {
  return await db
    .collection(collection)
    .find(query)
    .toArray()
}

module.exports = {
  getCollection,
}
