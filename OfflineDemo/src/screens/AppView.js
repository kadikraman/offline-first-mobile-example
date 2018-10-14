// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { type NavigationScreenProp } from 'react-navigation';
import styled from 'styled-components/native';

import CreatePostButton from '../components/CreatePostButton';
import Post from '../components/Post';
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

type PostType = {
  id: number,
  text: string,
  createdAt: Date
};

type Props = {
  navigation: NavigationScreenProp
};

type State = {
  posts: Array<PostType>
};

export default class App extends Component<Props, State> {
  state: State = {
    posts: [
      {
        id: 1,
        text: 'Initial post',
        createdAt: new Date()
      },
      {
        id: 2,
        text: 'Another post',
        createdAt: new Date()
      }
    ]
  };
  render() {
    const { navigation } = this.props;
    const { posts } = this.state;

    return (
      <Page>
        <SunWrapper>
          <Sun />
        </SunWrapper>
        <Feed>
          <CreatePostButton onPress={() => navigation.navigate('CreatePostModal')} />
          <FlatList
            data={posts}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Post post={item} />}
          />
        </Feed>
      </Page>
    );
  }
}
