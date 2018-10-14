// @flow

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');


module.exports = new ApolloServer({
  formatError: error => {
    console.error(error);
    return error;
  },
  typeDefs,
  resolvers,
  tracing: true,
  playground: {
    settings: {
      'editor.cursorShape': 'line'
    }
  }
});
