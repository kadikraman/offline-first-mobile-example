// @flow
import { createStackNavigator } from 'react-navigation';

import AppView from './AppView';
import CreatePostModal from './CreatePostModal';

export default createStackNavigator(
  {
    App: {
      screen: AppView
    },
    CreatePostModal: {
      screen: CreatePostModal
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'App'
  }
);
