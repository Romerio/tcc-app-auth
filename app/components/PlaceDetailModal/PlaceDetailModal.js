import React from 'react'
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

const placeDetail = (props) => {
    let modalContent = null

    if(props.selectedPlace) {
        modalContent = (
            <View>
                <Image 
                    source={props.selectedPlace.image} 
                    style={styles.placeImage}
                />
                <Text style={styles.placeName} >{props.selectedPlace.name}</Text>
            </View>
        )
    }

    return (
        <Modal
            visible={!!props.selectedPlace}
            animationType="slide"
            onRequestClose={props.onModalClose}
        >
            <View style={styles.modalContainer} >
                {modalContent}
                <View>
                    <TouchableOpacity onPress={props.onItemDeleted} >
                        <View style={styles.deleteButton} >
                            <Icon size={30} name="ios-trash" color="red" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.onModalClose} >
                        <View style={styles.deleteButton} >
                            <Icon size={30} name="ios-close-circle" color="blue" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        )
}

const styles = StyleSheet.create({
    modalContainer: {
        margin: 22
    },
    placeImage: {
        height: 200,
        width: "100%"
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    },
    deleteButton: {
        alignItems: 'center',
    }
})

export default placeDetail