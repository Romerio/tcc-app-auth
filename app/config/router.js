import React from 'react';
import { Button } from 'react-native'
import { 
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';

import SideMenuButton from '../screens/SideMenuButton/SideMenuButton'
import SideMenu from '../screens/SideMenu/SideMenu'
import FindPlace from '../screens/FindPlace/FindPlace'
import AuthScreen from '../screens/Auth/Auth'

export const AppStack = createStackNavigator({
  FindPlace: {
    screen: FindPlace,
    navigationOptions: ({ navigation }) => ({
      title: `Places`,
      headerLeft: ({ tintColor }) => <SideMenuButton />,
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
  /*FindPlace: {
    screen: null,
  },*/
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
