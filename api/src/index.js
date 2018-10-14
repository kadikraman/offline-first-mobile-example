// @flow
const express = require('express');
const server = require('./server');

try {
  console.log('Running server');

  const app = express();


  server.applyMiddleware({ app });

  app.listen({ port: 7000 }, () =>
    console.log(`🚀 Server ready at http://localhost:${7000}/graphql`)
  );
} catch (err) {
  console.error('Error starting up express', err);
}
