// @flow
import gql from 'graphql-tag';

import GET_POSTS from '../queries/getPosts';

export default gql`
  mutation createPost($text: String!) {
    createPost(text: $text) {
      id
      text
      createdAt
    }
  }
`;

export const createPostUpdate = (
  cache: Object,
  {
    data: { createPost }
  }: {
    data: {
      createPost: {
        id: string,
        text: string,
        createdAt: Date
      }
    }
  }
) => {
  const cachedPosts = cache.readQuery({
    query: GET_POSTS
  });

  cache.writeQuery({
    query: GET_POSTS,
    data: {
      posts: [createPost, ...cachedPosts.posts]
    }
  });
};
