import React from 'react';
import { 
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Feed from '../screens/Feed';
import Me from '../screens/Me';
import UserDetail from '../screens/UserDetail'
import Settings from '../screens/Settings'

export const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Feed',
    },
  },
  UserDetail: {
    screen: UserDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),
  },
})

export const Tabs = createMaterialTopTabNavigator({
    Feed: {
      screen: FeedStack,
      navigationOptions: {
        tabBarLabel: 'Feed',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
      },
    },
    Me: {
      screen: Me,
      navigationOptions: {
        tabBarLabel: 'Me',
        tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
      },
    },
}, { 
    tabBarOptions: { 
      style: { 
        //backgroundColor: 'blue', 
        marginTop: 24 
      },
      showIcon: true
    }
  });

  export const SettingStack = createStackNavigator({
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: 'Settings',
      },
    },
  })
  

  export const Root = createStackNavigator({
    Tabs: {
      screen: Tabs,
    },
    Settings: {
      screen: SettingStack,
    },
  }, {
    mode: 'modal',
    headerMode: 'none'
  })