// @flow
import { AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';

export default async () => {
  const retryLink = new RetryLink({
    delay: {
      initial: 1000
    },
    attempts: {
      max: 1000,
      retryIf: (error, _operation) => {
        if (error.message === 'Network request failed') {
          if (_operation.operationName === 'createPost') {
            return true;
          }
        }
        return false;
      }
    }
  });

  const httpLink = new HttpLink({ uri: 'http://localhost:7000/graphql' });
  const link = ApolloLink.from([retryLink, httpLink]);

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
