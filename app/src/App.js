// @flow

/* eslint-disable react/no-did-mount-set-state */

import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import RootComponent from './screens/RootComponent';
import getApolloClient from './config/getApolloClient';

type State = {
  hasHydrated: boolean,
  apolloClient: any
};

class App extends Component<*, State> {
  state = {
    hasHydrated: false,
    apolloClient: null
  };

  async componentDidMount(): any {
    const apolloClient = await getApolloClient();

    this.setState({
      hasHydrated: true,
      apolloClient
    });
  }

  render() {
    const { apolloClient, hasHydrated } = this.state;

    if (!hasHydrated) {
      return null;
    }

    return (
      <ApolloProvider client={apolloClient}>
        <RootComponent />
      </ApolloProvider>
    );
  }
}

export default App;
