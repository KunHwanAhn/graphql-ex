const { ApolloServer, gql } = require("apollo-server");

const photos = [];
let idIndex = 0;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Photo {
    "Id of the photo"
    id: ID!
    "URL of the photo"
    url: String!
    "Name of the photo"
    name: String!
    "Description of the photo"
    description: String
  }

  type Query {
    hello: String
    totalPhotos: Int!
    """
    Get all the list of photos
    """
    allPhotos: [Photo!]!
  }

  type Mutation {
    """
    Add a new photo
    """
    postPhoto(
      "Name of the new photo"
      name: String!,
      "Description of the new photo"
      description: String
    ): Photo!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  // Query Resolver
  Query: {
    hello: (root, args, context) => "Hello world!",
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  // Mutation Resolver
  Mutation: {
    postPhoto(parent, args) {
      console.log(args);

      const newPhoto = {
        id: idIndex++,
        ...args,
      };

      photos.push(newPhoto);
      return newPhoto;
    }
  },
  // Type Resolver
  Photo: {
    url: parent => `http://yoursite.com/img/${parent.id}.jpg`
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
