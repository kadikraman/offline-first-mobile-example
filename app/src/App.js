// @flow

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RetryLink } from 'apollo-link-retry';
import { ApolloLink } from 'apollo-link';

import RootComponent from './screens/RootComponent';

const retryLink = new RetryLink({
  delay: {
    initial: 500
  },
  attempts: {
    max: 100,
    retryIf: (error, _operation) => {
      console.log('retrying');
      return true;
    }
  }
});

const httpLink = new HttpLink({ uri: 'http://localhost:7000/graphql' });

const link = ApolloLink.from([retryLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default () => (
  <ApolloProvider client={client}>
    <RootComponent />
  </ApolloProvider>
);
