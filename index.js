const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')


const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

require('./src/db/mongoose')





const server = new ApolloServer({
  typeDefs,
  resolvers
})

const port = process.env.PORT

server.listen({ port: 3000})
  .then(res => {
    console.log(`Server is running on ` + port)
  })