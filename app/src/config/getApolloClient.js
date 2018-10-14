// @flow
import { AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { RetryLink } from 'apollo-link-retry';
import { ApolloLink } from 'apollo-link';
import { persistCache } from 'apollo-cache-persist';

export default async () => {
  // const retryLink = new RetryLink({
  //   delay: {
  //     initial: 500
  //   },
  //   attempts: {
  //     max: 100,
  //     retryIf: (error, _operation) => {
  //       console.log('retrying');
  //       return true;
  //     }
  //   }
  // });

  const httpLink = new HttpLink({ uri: 'http://localhost:7000/graphql' });

  const link = ApolloLink.from([httpLink]);

  const cache = new InMemoryCache();

  const apolloClient = new ApolloClient({
    link,
    cache
  });

  try {
    await persistCache({
      cache,
      storage: AsyncStorage
    });
  } catch (err) {
    console.error('Error restoring Apollo cache', err); // eslint-disable-line no-console
  }

  return apolloClient;
};
