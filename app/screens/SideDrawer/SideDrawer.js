import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { authLogout } from '../../store/actions/index'

const sideIcons = Platform.OS === 'android' ? {
    logOut: 'md-log-out'
} : {
    logOut: 'ios-log-out'
}

class SideDrawer extends Component {
    render() {
        return (
            <View style={[
                styles.container,
                {
                    width: Dimensions.get('window').width * 0.8
                }
            ]} >
                <TouchableOpacity onPress={this.props.onLogout} >
                    <View style={styles.drawerItem} >
                        <Icon name={sideIcons.logOut} size={30} color='#aaa'  style={styles.drawerItemIcon} />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: 'white'
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee'
    },
    drawerItemIcon: {
        marginRight: 10
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(SideDrawer)