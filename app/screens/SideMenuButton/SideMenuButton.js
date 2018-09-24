import React from 'react';
import { Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';

class MyBackButton extends React.Component {
  render() {
    return <Icon name="list" size={35} onPress={() => this.props.navigation.openDrawer()} />; //this.props.navigation.openDrawer()
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(MyBackButton);