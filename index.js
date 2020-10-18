const { ApolloServer, PubSub } = require('apollo-server')
const gql = require('graphql-tag')


const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

require('./src/db/mongoose')



const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
})

const port = process.env.PORT

server.listen({ port: 3000})
  .then(res => {
    console.log(`Server is running on ` + port)
  })