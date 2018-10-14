// @flow
import styled from 'styled-components/native';
import avatarSrc from '../assets/kadi.jpeg';

export default styled.Image.attrs({ source: avatarSrc })`
  margin-right: 10px;
  background-color: red;
  border-radius: 15px;
  height: 30px;
  width: 30px;
`;
