import React, { Component } from 'react';
import { Provider } from 'react-redux'

import { Root } from './app/config/router2';
import { DrawerTest } from './app/screens/Tests/DrawerTest';
import DrawerTest2 from './app/screens/Tests/routes2';
import DrawerTest3 from './app/screens/Tests/routes3';

import { Auth } from './app/config/router';
import { Drawer } from './app/config/router';

import configureStore from './app/store/configureStore'

const store = configureStore()

class App extends Component {
  render() {
   // return <Auth />;
    return (
      <Provider store={store}>
        <Auth />
      </Provider>
    )
  }
}

export default App;