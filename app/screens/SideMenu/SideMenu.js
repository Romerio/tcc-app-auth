import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import { connect } from 'react-redux'

import { authLogout } from '../../store/actions/index'

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });

    if(route === 'AuthLoading') {
        this.props.onLogout()
    }

    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle} onPress={this.navigateToScreen('Home')} >
              Home
            </Text>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle} onPress={this.navigateToScreen('Settings')} >
              Settings
            </Text>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle} onPress={this.navigateToScreen('AuthLoading')} >
                Logout
            </Text>
          </View>
        </ScrollView>
        <View style={styles.footerContainer} >
          <Text>Version 0.1</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1
    },
    navItemStyle: {
        padding: 10
    },
    navSectionStyle: {
        backgroundColor: 'lightgrey'
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
    }
})

const mapDispatchToProps = dispatch => {
  return {
      onLogout: () => dispatch(authLogout())
  }
}

export default connect(null, mapDispatchToProps)(SideMenu)