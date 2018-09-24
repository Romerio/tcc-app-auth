import React, {Component} from 'react';
import { AppRegistry, Text, StyleSheet, View } from 'react-native';

export default class Page2 extends Component {
  render () {
    return (
      <View style={styles.container}  >
        <Text >Page 2</Text>
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