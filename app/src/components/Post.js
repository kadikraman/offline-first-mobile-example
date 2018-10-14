// @flow

import React from 'react';
import ShadowCard from './ShadowCard';
import Text from './Text';
import Author from './Author';

type Props = {
  post: {
    id: string,
    text: string,
    createdAt: Date
  }
};

export default ({ post }: Props) => (
  <ShadowCard>
    <Author post={post} />
    <Text>{post.text}</Text>
  </ShadowCard>
);
