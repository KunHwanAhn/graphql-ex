const { ApolloServer, UserInputError, gql } = require('apollo-server')

const photos = [
  {
    id: '0',
    name: 'Dropping the Heart Chute',
    description: 'The heart chute is one of my favorite chutes',
    category: 'ACTION',
    githubUser: 'gPlake',
  },
  {
    id: '1',
    name: 'Enjoying the subshine',
    category: 'SELFIE',
    githubUser: 'sSchmidt',
  },
  {
    id: '2',
    name: 'Gunbarrel 25',
    description: '25 laps on gunbarrel today',
    category: 'LANDSCAPE',
    githubUser: 'sSchmidt',
  },
]

const users = [
  {
    githubLogin: 'mHattrup',
    name: 'Mike Hattrup',
  },
  {
    githubLogin: 'gPlake',
    name: 'Glen Plake',
  },
  {
    githubLogin: 'sSchmidt',
    name: 'Scot Schmidt',
  },
]

let photoIdIndex = photos.length

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }

  input PostPhotoInput {
    "Name of the new photo"
    name: String!
    "Github username for the user who add the pohto"
    githubUser: String!
    "Category of the new photo, default is PORTRAIT"
    category: PhotoCategory = PORTRAIT
    "Description of the new photo"
    description: String
  }

  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]
  }

  type Photo {
    "Id of the photo"
    id: ID!
    "URL of the photo"
    url: String!
    "Name of the photo"
    name: String!
    "Category of the photo"
    category: PhotoCategory!
    "Description of the photo"
    description: String
    "User who added the pohto"
    postedBy: User!
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
    postPhoto(input: PostPhotoInput): Photo!
  }
`

// Provide resolver functions for your schema fields
const resolvers = {
  // Query Resolver
  Query: {
    hello: () => 'Hello world!',
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  // Mutation Resolver
  Mutation: {
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
      }

      photos.push(newPhoto)
      return newPhoto
    },
  },
  // Type Resolver
  Photo: {
    url: parent => `http://yoursite.com/img/${parent.id}.jpg`,
    postedBy: parent => {
      return users.find(u => u.githubLogin === parent.githubUser)
    },
  },
  User: {
    postedPhotos: parent => {
      return photos.filter(p => p.githubUser === parent.githubLogin)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`)
})
