// @flow

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import RootComponent from './screens/RootComponent';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:7000/graphql' }),
  cache: new InMemoryCache()
});

export default () => (
  <ApolloProvider client={client}>
    <RootComponent />
  </ApolloProvider>
);
