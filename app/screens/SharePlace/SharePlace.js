import React, { Component } from 'react'
import {
    View,
    ScrollView, 
    Text,
    Button,
    StyleSheet,
    Image,
    ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'

import { addPlace } from '../../store/actions/index'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PickImage from '../../components/PickImage/PickImage'
import PickLocation from '../../components/PickLocation/PickLocation'
import validation from '../../utility/validation'
import { startAddPlace } from '../../store/actions/index'

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    }

    state = {
        placeName: '',
        controls: {
            placeName: {
                valid: false,
                value: '',
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            location: {
                valid: false,
                value: null,
            }
        }
    }

    constructor(props) {
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    componentWillMount() {
        this.reset()
    }

    reset = () => {
        this.setState({
            controls: {
                placeName: {
                    valid: false,
                    value: '',
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                location: {
                    valid: false,
                    value: null,
                }
            }
        })
    }

    componentDidUpdate() {
        if(this.props.placeAdded) {
            this.props.navigator.switchToTab({
                tabIndex: 0
            })

            // this.props.onStartAddPlace()
        }
    }

    onNavigatorEvent = event => {
        if(event.type === 'ScreenChangedEvent' && event.id === 'willAppear') {
            this.props.onStartAddPlace()
        }

        if(event.type === 'NavBarButtonPress') {
            if(event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    to: 'open'
                })
            }
        }
    }

    placeNameChangedHandler = val => {
        this.setState(prevState => {
            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validation(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
        })
    }

    locationPickedHandler = location => {
        this.setState(prevState => {

            return {
                ...prevState,
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    placeAddedHndler = () => {
        this.props.onPlaceAdded(
            this.state.controls.placeName.value, 
            this.state.controls.location.value
        )
    
        this.reset()
        this.imagePicker.reset()
        this.locationPicker.reset()

        /*this.props.navigator.switchToTab({
            tabIndex: 0
        })*/
    }

    render() {
        let submitButton = (
            <Button
                title="Share a Place!"
                onPress={this.placeAddedHndler}
                disabled={
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid
                }
            />
        )

        if(this.props.isLoading) {
            submitButton = <ActivityIndicator />
        }

        return (
            <ScrollView>
                <View style={styles.container} >
                    <MainText>
                        <HeadingText>Share a Place with us!<HeadingText/>
                    </HeadingText></MainText>
                    <PickImage
                        ref={ref => (this.imagePicker = ref)}
                    />
                    <PickLocation
                        onLocationPick={this.locationPickedHandler}
                        ref={ref => (this.locationPicker = ref)}
                    />
                    <PlaceInput
                        placeData={this.state.controls.placeName}
                        onChangeText={this.placeNameChangedHandler}
                    />
                    <View style={styles.button} >
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150 
    },
    previewImage: {
        width: '100%',
        height: '100%'
    },
    button: {
        margin: 8
    }
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        placeAdded: state.places.placeAdded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPlaceAdded: (placeName, location) => dispatch(addPlace(placeName, location)),
        onStartAddPlace: () => dispatch(startAddPlace())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen)