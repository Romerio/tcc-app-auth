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
        placesAnim: new Animated.Value(0),
        tabPresentationMode: true
    }
    
    constructor(props) {
        super(props)
    }

    componentDidMount(event) {
        console.log('- Abriu a lista de services')
        console.log(this.props.navigation.state.params)
        
        if(this.props.navigation.state.params && typeof this.props.navigation.state.params.tabPresentationMode === 'boolean') {
            // Veio de uma navegação para gerenciar serviços

            this.setState({
                ...this.state,
                tabPresentationMode: this.props.navigation.state.params.tabPresentationMode
            })

            this.props.onLoadServices()
        } else {
            // Veio para a lista de serviços do usuário
            this.setState({
                ...this.state,
                tabPresentationMode: true
            })

            // #TO-DO: carregar apenas os serviços do usuário
            this.props.onLoadServices()
        }

        console.log('##')
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
            <View >
                <ServiceList
                        services={this.props.services}
                        onItemSelected={this.itemSelectedHandler}
                        showAddButton={this.state.tabPresentationMode}
                        enableSwipeout={this.state.tabPresentationMode}
                    />
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