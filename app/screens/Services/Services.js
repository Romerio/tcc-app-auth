import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Animated
} from 'react-native'
import { connect } from 'react-redux'

import ServiceList from '../../components/ServiceList/ServiceList'
import { getServices, getUserServices } from '../../store/actions/index'

class FindServices extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }

    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1),
        placesAnim: new Animated.Value(0),
        tabPresentationMode: true,
        reloadServiceList: false
    }
    
    constructor(props) {
        super(props)

        this.props.navigation.addListener('didFocus', this.handleTaDidFocus)
        // this.props.navigation.addListener('willBlur', this.handleTabWillBlur)
    }

    handleTabWillBlur = () => {
        //console.log('- willBlur', this.state.tabPresentationMode)
        if(this.state.tabPresentationMode == true) { // Saí da listagem de todos os serviços
            this.setState({
                ...this.state,
                reloadServiceList: true
            })
            this.props.onLoadUserServices()
        }
    }

    handleTaDidFocus = () => {
        //console.log('- didFocus', this.state.tabPresentationMode)
        if(this.state.tabPresentationMode == true) { // Saí da listagem de todos os serviços
            this.setState({
                ...this.state,
                reloadServiceList: true
            })
            this.props.onLoadUserServices()
        }
    }

    componentDidMount() {
        // console.log('- Abriu a lista de services')
        // console.log(this.props.navigation.state.params)
        
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
            this.props.onLoadUserServices()
        }

        // console.log('##')
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

    handleAssociationAction = () => {
        // console.log('- handleAssociationAction')
    
        this.props.navigation.navigate('CodeScanner', { 
            //action: 'association'
        })
    }
    
    itemSelectedHandler = key => {
        const selectedService = this.props.services.find(p => p.key === key)
        // console.log('- Servico selecionado ', selectedService)

        this.props.navigation.navigate('ServiceDetail', { 
            title: selectedService.name,
            selectedService,
            onAssociationAction: this.handleAssociationAction
        })

        // Navega para a tela de detalhes
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
        /*let content = (
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
        }*/
        let content = null

        if(this.props.isLoading) {
            content = (
                <View styles={styles.activityIndicator} >
                    <ActivityIndicator />
                </View>
            )
        } else {
            content = (
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
        
        return (
            content
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
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        height: '100%'
    }
})

const mapStateToProps = (state) => {
    return {
        services: state.services.services,
        isLoading: state.ui.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadServices: () => dispatch(getServices()),
        onLoadUserServices: () => dispatch(getUserServices())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindServices)