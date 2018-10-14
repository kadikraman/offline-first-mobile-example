// @flow

import React from 'react';
import styled from 'styled-components';
import Avatar from './Avatar';
import Text from './Text';

const CreatePostButtonContainer = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #eef1f4;
`;

const CreatePostTouchable = styled.TouchableOpacity`
  flex-direction: row;
  padding: 0 20px;
  align-items: center;
  height: 60px;
  background-color: white;
`;

type Props = {
  onPress: Function
};

const CreatePostButton = ({ onPress }: Props) => (
  <CreatePostButtonContainer>
    <CreatePostTouchable onPress={onPress}>
      <Avatar />
      <Text>Add a new post...</Text>
    </CreatePostTouchable>
  </CreatePostButtonContainer>
);

export default CreatePostButton;
