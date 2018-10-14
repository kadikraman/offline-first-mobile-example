// @flow

import React from 'react';
import styled from 'styled-components/native';
import { View, TouchableOpacity, Alert } from 'react-native';
import formatDate from 'date-fns/format';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import differenceInDays from 'date-fns/difference_in_days';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import { Mutation } from 'react-apollo';
import DELETE_POST, {
  deletePostUpdate,
  getOptimisticResponse
} from '../graphql/mutations/deletePost';

import Text from './Text';
import Avatar from './Avatar';

const StyledAvatar = styled(Avatar)`
  margin-right: 10px;
`;

const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10px;
  margin-bottom: 10px;
`;

const AvatarWrapper = styled.View`
  flex-direction: row;
`;

export const getHumanDate = (createdAt: number) => {
  const dateNow = new Date();
  const dateLater = new Date(createdAt);

  if (differenceInSeconds(dateNow, dateLater) <= 10) {
    return 'just now';
  }

  if (differenceInDays(dateNow, dateLater) >= 1) {
    return formatDate(dateLater, 'dddd Do MMM');
  }

  return distanceInWordsStrict(dateNow, dateLater, { addSuffix: true });
};

const Author = ({ post }: { post: { createdAt: Date, id: string, text: string } }) => (
  <Wrapper>
    <AvatarWrapper>
      <StyledAvatar />
      <View>
        <Text bold style={{ paddingBottom: 4 }}>
          Kadi Kraman
        </Text>
        <Text tiny>{getHumanDate(post.createdAt)}</Text>
      </View>
    </AvatarWrapper>
    <Mutation mutation={DELETE_POST} update={deletePostUpdate}>
      {deletePost => (
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Are you sure?', null, [
              { text: 'No' },
              {
                text: 'Yes',
                onPress: () => {
                  deletePost({
                    variables: { id: post.id },
                    optimisticResponse: getOptimisticResponse(post.id)
                  });
                }
              }
            ]);
          }}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      )}
    </Mutation>
  </Wrapper>
);

export default Author;
