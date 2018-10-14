// @flow
const { gql } = require('apollo-server-express');
const GraphQLDate = require('graphql-date');
const reverse = require('lodash/reverse');
const findIndex = require('lodash/findIndex');

const timeout = (milliseconds) => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, milliseconds)
})

let POST_DATA = [
  {
    id: '1',
    text: 'My first post! 🎉',
    createdAt: new Date()
  }
]

let ID_INDEX = POST_DATA.length;

const post = async (_, args) => {
  console.log(`GET post ID: ${args.id}`)
  return POST_DATA.find(post => post.id === args.id);
};

const posts = async () => {
  console.log('GET posts');
  await timeout(1000)

  return reverse(POST_DATA);
};

const withoutIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const deletePost = async (_, args) => {
  console.log(`DELETE post with ID: ${args.id}`);
  const index = findIndex(POST_DATA, post => post.id === args.id)

  POST_DATA = withoutIndex(POST_DATA, index);

  return { id: args.id };
};

const createPost = async (_, args) => {
  console.log(`CREATE post with text: ${args.text}`);
  ID_INDEX += 1;

  const newPost = {
    id: String(ID_INDEX),
    text: args.text,
    createdAt: new Date(),
  }

  POST_DATA.push(newPost)

  return newPost;
}

const typeDefs = gql`
  scalar Date

  type Post {
    id: ID!
    text: String
    createdAt: Date
  }

  type DeletedId {
    id: String!
  }

  type Mutation {
    deletePost(id: ID!): DeletedId
    createPost(text: String!): Post
  }


  type Query {
    posts: [Post]
    post(id: ID!): Post
  }
`;

const resolvers = {
  Date: GraphQLDate,
  Query: {
    post,
    posts
  },
  Mutation: {
    deletePost,
    createPost
  }
}

module.exports = {
  resolvers,
  typeDefs
};
