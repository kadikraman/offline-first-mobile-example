// @flow
import gql from 'graphql-tag';

import GET_POSTS from '../queries/getPosts';

export default gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const getOptimisticResponse = (id: string) => ({
  __typename: 'Mutation',
  deletePost: {
    __typename: 'DeletedId',
    id
  }
});

export const deletePostUpdate = (
  cache: Object,
  { data: { deletePost } }: { data: { deletePost: { id: string } } }
) => {
  const cachedPosts = cache.readQuery({
    query: GET_POSTS
  });

  cache.writeQuery({
    query: GET_POSTS,
    data: {
      posts: cachedPosts.posts.filter(post => post.id !== deletePost.id)
    }
  });
};
