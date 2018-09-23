import React, { Component } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native';
import imagePlaceHouder from '../../assets/background-1.jpg'

class PickImage extends Component {
    reset = () => {

    }
    
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.placeholder} >
                    <Image source={imagePlaceHouder}
                        resizeMode="cover"
                        style={styles.previewImage}
                    />
                </View>
                <View style={styles.button} >
                    <Button title="Pick Image" onPress={() => {}} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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

export default PickImage