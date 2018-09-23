import React from 'react';
import { 
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import FindPlace from '../screens/FindPlace/FindPlace'
import AuthScreen from '../screens/Auth/Auth'

export const Auth = createStackNavigator({
    AuthScreen: {
      screen: AuthScreen,
    },
    FindPlace: {
      screen: FindPlace,
      navigationOptions: ({ navigation }) => ({
        title: `Places`,
        headerLeft: null
      }),
    },
  })