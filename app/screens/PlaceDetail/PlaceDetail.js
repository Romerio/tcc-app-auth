import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons'
import { deletePlace } from '../../store/actions/index'

const placeDetailIcons = Platform.OS === 'android' ? {
    trash: 'md-trash'
} : {
    logOut: 'ios-trash'
}

class PlaceDetail extends Component{
    state = {
        viewMode: 'portrait'
    }

    constructor(props) {
        super(props)

        Dimensions.addEventListener('change', this.updateStyles)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles)
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 450 ? 'portrait' : 'landscape'
        })
    }

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key)
        this.props.navigator.pop()
    }

    render() {
        console.log('############## localizacao: ')
        console.log(this.props.selectedPlace.location)

        return (
            <View 
                style={[
                    styles.container, this.state.viewMode === 'portrait' 
                    ? styles.portraitContainer 
                    : styles.landscapeContainer 
                ]}
            >
                <View style={styles.placeDetailContainer} >
                    <View style={styles.subContaner} >
                        <Image 
                            source={this.props.selectedPlace.image} 
                            //source={{uri: this.props.selectedPlace.image }} //|| '../../assets/background-1.jpg'
                            style={styles.placeImage}
                        />
                    </View>
                    <View style={styles.subContaner} >
                        <MapView style={styles.map} initialRegion={{
                            ...this.props.selectedPlace.location,
                            latitudeDelta: 0.0122,
                            longitudeDelta: 
                                0.0122 *
                                Dimensions.get('window').width /
                                Dimensions.get('window').height
                        }} >
                            <MapView.Marker coordinate={this.props.selectedPlace.location} />
                        </MapView>
                    </View>
                </View>
                <View style={styles.subContaner} >
                    <View>
                        <Text style={styles.placeName} >{this.props.selectedPlace.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler} >
                            <View style={styles.deleteButton} >
                                <Icon size={30} name={placeDetailIcons.trash} color="red" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
        flexDirection: 'row'
    },
    placeDetailContainer: {
        flex: 2
    },
    placeImage: {
        height: '100%',
        width: "100%"
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    },
    deleteButton: {
        alignItems: 'center',
    },
    subContaner: {
        flex: 1
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(deletePlace(key))
    }
}

export default connect(null, mapDispatchToProps)(PlaceDetail)