import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated
} from 'react-native'
import { connect } from 'react-redux'

import ServiceList from '../../components/ServiceList/ServiceList'
import { getServices } from '../../store/actions/index'

class FindServices extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }

    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0)
    }
    
    constructor(props) {
        super(props)
        // #TO-DO: mudar navegação
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    componentDidMount(event) {
        this.props.onLoadServices()
    }

    /*onNavigatorEvent = event => {
        if(event.type === 'ScreenChangedEvent' && event.id === 'willAppear') {
            this.props.onLoadServices()
        }

        if(event.type === 'NavBarButtonPress') {
            if(event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    to: 'open'
                })
            }
        }
    }*/

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
        })
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            })
            this.placesLoadedHandler()
        })
    }
    
    itemSelectedHandler = key => {
        const selectedPlace = this.props.services.find(p => p.key === key)

        console.log('- Servico selecionado: ' + selectedPlace.name)

        /*this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: selectedPlace.name,
            passProps: {
                selectedPlace
            },
            animationType: 'slide-horizontal'
        })*/
    }

    render() {
        let content = (
            <Animated.View
                style={{
                    opacity: this.state.removeAnim,
                    transform: [
                        {
                            scale: this.state.removeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [12, 1]
                            })
                        }
                    ]
                }}
            >
                <TouchableOpacity onPress={this.placesSearchHandler} >
                    <View style={styles.searchButon} >
                        <Text style={styles.searchButonText} >Find Services</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )

        if(this.state.placesLoaded) {
            content = (
                <Animated.View
                    style={{
                        opacity: this.state.placesAnim
                    }}
                >
                    <ServiceList
                        services={this.props.services}
                        onItemSelected={this.itemSelectedHandler}
                    />
                </Animated.View>

            )
        }

        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer} >
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButon: {
        borderColor: 'orange',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButonText: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 26,
    }
})

const mapStateToProps = (state) => {
    return {
        services: state.services.services
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadServices: () => dispatch(getServices())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindServices)