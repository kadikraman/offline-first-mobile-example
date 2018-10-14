// @flow

import React, { Component } from 'react';
import { type NavigationScreenProp } from 'react-navigation';
import styled from 'styled-components/native';

import CreatePostButton from '../components/CreatePostButton';
import sunSrc from '../assets/sun.gif';

const Sun = styled.Image.attrs({ source: sunSrc })`
  height: 100px;
  width: 100px;
`;

const Feed = styled.View`
  background-color: #eef1f4;
  flex: 1;
`;

const Page = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 30px;
  justify-content: center;
`;

const SunWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 120px;
`;

type Props = {
  navigation: NavigationScreenProp
};

export default class App extends Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <Page>
        <SunWrapper>
          <Sun />
        </SunWrapper>
        <Feed>
          <CreatePostButton onPress={() => navigation.navigate('CreatePostModal')} />
        </Feed>
      </Page>
    );
  }
}
