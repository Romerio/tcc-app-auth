
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class EmptyScreen extends Component {
  render() {
    return (
      <View style={styles.container} >
        <Text>Empty Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

export default EmptyScreen;
