// @flow
import gql from 'graphql-tag';

export default gql`
  query posts {
    posts {
      id
      createdAt
      text
    }
  }
`;
