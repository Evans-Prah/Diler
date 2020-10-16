const { AuthenticationError } = require('apollo-server')

const Post = require('../../models/Post')
const auth = require('../../src/utils/auth')

module.exports = {
  Query: {
    async getPosts(){
        try{
              const posts = await Post.find().sort({ createdAt: -1 })
              return posts
        } catch(error) {
          throw new Error(error)
        }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
        if(post){
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context){
      const user = auth(context)

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      })

      const post = await newPost.save()

      return post
    },

    async deletePost(_, { postId }, context){
      const user = auth(context)

      try {
        const post = await Post.findById(postId)
        if(user.username === post.username) {
          await post.delete()
          return 'Post has been deleted successfully'
        } else {
          throw new AuthenticationError('Request cannot be executed')
        }
      } catch (error) {
        throw new  Error(error)
      }
    }
  }
}

