// @flow
const { gql } = require('apollo-server-express');
const GraphQLDate = require('graphql-date');

const post_data = [
  {
    id: '1',
    text: 'Initial post',
    createdAt: new Date()
  },
  {
    id: '2',
    text: 'Another post',
    createdAt: new Date()
  }
]

let ID_INDEX = post_data.length;

const post = async (_, args) => {
  return post_data.find(post => post.id === args.id);
};

const posts = async () => {
  return post_data;
};

const getNewValue = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const deletePost = async (_, args) => {
  return { id: args.id };
};

const addPost = async (_, args) => {
  ID_INDEX += 1;

  const newPost = {
    id: String(ID_INDEX),
    text: args.text,
    createdAt: new Date(),
  }

  post_data.push(newPost)

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
    deletePost(id: String!): DeletedId
    addPost(text: String!): Post
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
    addPost
  }
}

module.exports = {
  resolvers,
  typeDefs
};
