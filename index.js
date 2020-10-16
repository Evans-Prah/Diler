const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')


const Post = require('./models/Post')
const User = require('./models/User')
require('./src/db/mongoose')


const typeDefs = gql`
    type Post{
      id: ID!
      body: String!
      createdAt: String!
      username: String!
    }
    type Query{
      getPosts: [Post]
    }
`

const resolvers = {
  Query: {
    async getPosts(){
        try{
              const posts = await Post.find()
              return posts
        } catch(err) {
          throw new Error(err)
        }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const port = process.env.PORT

server.listen({ port: 3000})
  .then(res => {
    console.log(`Server is running on ` + port)
  })