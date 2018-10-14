// @flow
import { createStackNavigator } from 'react-navigation';

import AppView from './screens/AppView';
import CreatePostModal from './screens/CreatePostModal';

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
