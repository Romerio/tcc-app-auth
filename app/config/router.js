import React from 'react';
import { Button } from 'react-native'
import { 
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import EmptyScreen from '../screens/Tests/EmptyScreen'

import SideMenuButton from '../screens/SideMenuButton/SideMenuButton'
import SideMenu from '../screens/SideMenu/SideMenu'
import FindPlace from '../screens/FindPlace/FindPlace'
import AuthScreen from '../screens/Auth/Auth'
import Settings from '../screens/Settings'

export const Tabs = createMaterialTopTabNavigator({
  FindPlace: {
    screen: FindPlace,
    navigationOptions: {
      tabBarLabel: 'Places',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  EmptyScreen: {
    screen: EmptyScreen,
    navigationOptions: {
      tabBarLabel: 'Empty',
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

export const AppStack = createStackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({
      title: `Authenticator`,
      headerLeft: ({ tintColor }) => <SideMenuButton />,
      headerStyle:  {
          backgroundColor: '#0080FF',
      },
      headerTitleStyle: { 
        color: 'white' 
      }
      //tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
      /*headerLeft: (
        <Button
          onPress={() => alert('press')}
          title="+1"
          color="#fff"
        />
      )*/
    }),
  },
  Settings: {
    screen: Settings,
  },
}, {
  tabBarOptions: {
    showIcon: true,
  }
})

export const Drawer = createDrawerNavigator({
  Drawer: {
      screen: AppStack
    },
    /*Page2: {
      screen: Page2
    },
    Page3: {
        screen: Page3
    },*/
  }, {
    contentComponent: SideMenu,
    drawerWidth: 300
});

export const Auth = createSwitchNavigator(
  {
    //AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
    App: Drawer
  },
  {
    initialRouteName: 'Auth',
  }
);
