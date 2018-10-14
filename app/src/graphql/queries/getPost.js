// @flow
import gql from 'graphql-tag';

export default gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      createdAt
      text
    }
  }
`;
