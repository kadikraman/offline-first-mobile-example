// @flow

import React from 'react';
import styled from 'styled-components/native';
import { View, TouchableOpacity } from 'react-native';
import formatDate from 'date-fns/format';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import differenceInDays from 'date-fns/difference_in_days';
import differenceInSeconds from 'date-fns/difference_in_seconds';

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

const Author = ({ createdAt }: { createdAt: Date }) => (
  <Wrapper>
    <AvatarWrapper>
      <StyledAvatar />
      <View>
        <Text bold style={{ paddingBottom: 4 }}>
          Kadi Kraman
        </Text>
        <Text tiny>{getHumanDate(createdAt)}</Text>
      </View>
    </AvatarWrapper>
    <TouchableOpacity onPress={() => {}}>
      <Text>Delete</Text>
    </TouchableOpacity>
  </Wrapper>
);

export default Author;
