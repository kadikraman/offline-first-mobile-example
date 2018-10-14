// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { type NavigationScreenProp } from 'react-navigation';

import Text from '../components/Text';
import Avatar from '../components/Avatar';
import Page from '../components/Page';

const Header = styled.View`
  padding: 30px 20px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: #e1e4e9;
  border-bottom-width: 1px;
`;

const Author = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 20px 20px 0;
`;

const Editor = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const ScrollView = styled.ScrollView`
  padding: 20px;
`;

const Loading = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  justify-content: center;
  align-items: center;
`;

type Props = {
  navigation: NavigationScreenProp
};

type OwnState = {
  text: string
};

class CreatePost extends Component<Props, OwnState> {
  state: OwnState = {
    text: ''
  };
  props: Props;

  handleUpdateText = (text: string): void => {
    this.setState({ text });
  };

  createPost = () => {};

  render() {
    const { navigation } = this.props;
    const { text } = this.state;

    return (
      <Page>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={0}
          behavior="padding"
          enabled
        >
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text bold>Cancel</Text>
            </TouchableOpacity>
            <Text bold dark>
              Write a Post
            </Text>
            <Text bold primary>
              Post
            </Text>
          </Header>
          <Author>
            <Avatar />
            <Text dark>Kadi Kraman</Text>
          </Author>
          <Editor>
            <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
              <TextInput
                multiline
                value={text}
                style={{ marginBottom: 30 }}
                placeholder="Type here..."
                autoFocus
                onChangeText={this.handleUpdateText}
              />
            </ScrollView>
          </Editor>
        </KeyboardAvoidingView>
      </Page>
    );
  }
}

export default CreatePost;
