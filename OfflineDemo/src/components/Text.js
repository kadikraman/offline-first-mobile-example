// @flow

import styled from 'styled-components/native';

export default styled.Text`
  color: ${p => {
    if (p.primary) {
      return '#29dc8d';
    }

    if (p.dark) {
      return '#4a5665';
    }

    return '#6e7b8c';
  }};
  font-weight: ${p => (p.bold ? 'bold' : 'normal')};
  font-size: ${p => {
    if (p.tiny) {
      return 10;
    }
    return 14;
  }};
`;
