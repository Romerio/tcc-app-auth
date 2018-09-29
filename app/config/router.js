import React from 'react';
import { 
  createMaterialTopTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import SideMenuButton from '../screens/SideMenuButton/SideMenuButton'
import SideMenu from '../screens/SideMenu/SideMenu'
import AuthScreen from '../screens/Auth/Auth'
import Settings from '../screens/Settings'
import CodeScanner from '../screens/CodeScanner/CodeScanner'
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen'
import Services from '../screens/Services/Services'

export const ServiceManager = createStackNavigator({
  Services: { // Mostra todos os serviços
    screen: Services,
    navigationOptions: ({ navigation }) => ({
      title: `Services`,
      headerLeft: ({ tintColor }) => <SideMenuButton />,
      headerStyle:  {
          backgroundColor: '#0080FF',
      },
      headerTitleStyle: { 
        color: 'white' 
      }
    }),
  },
  ServiceDetail: {
    screen: Services,
    navigationOptions: ({ navigation }) => ({
      title: `Services`,
    }),
  },
}, {
  mode: 'modal',
  headerMode: 'none',
})

/*
  Contém a tab inicial da aplicação
    Esquerda: Leitor de QRCode para autenticar
    Direita: Lista de serviços cadastrados 
*/
export const Tabs = createMaterialTopTabNavigator({
  CodeScanner: {
    screen: CodeScanner,
    navigationOptions: {
      tabBarLabel: 'Authenticate',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
  Services: { // Mostra serviços do usuário
    screen: Services,
    navigationOptions: {
      swipeEnabled: false,
      tabBarLabel: 'My Services',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  }
}, { 
  tabBarOptions: { 
    style: { 
      //backgroundColor: 'blue', 
      marginTop: 24 
    },
    showIcon: true
  }
});

/*  Telas da aplicação principal
    Contén: 
      Tab (Autenticador e lista de serviços do usuário)
      Gerenciador de serviços
      Acesso aos itens do Menu lateral (SideMenu)
*/
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
    }),
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: `Settings`,
    }),
  },
  ServiceManager: {
    screen: ServiceManager,
    navigationOptions: ({ navigation }) => ({
      title: `Services`,
    }),
  },
}, {
  tabBarOptions: {
    showIcon: true,
    showLabel: true
  }
})

/*
  Conecta a aplicação principal ao menu lateral (Drawer)
*/
export const AppWithDrawer = createDrawerNavigator({
  AppStack: {
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

/*
  Se o usuário está autenticado, vai para App
  Se não está autenticado, vai para Auth
*/
export const Auth = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
    App: AppWithDrawer
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
