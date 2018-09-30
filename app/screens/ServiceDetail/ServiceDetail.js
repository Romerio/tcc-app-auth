import React from 'react'
import { Modal, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground'

// import Icon from 'react-native-vector-icons/Ionicons'

const placeDetail = (props) => {
    let modalContent = null

    if(props.selectedService) {
        modalContent = (
            <View style={styles.placeDataContainer}>
                <Image 
                    source={{uri: props.selectedService.image}} 
                    style={styles.placeImage}
                />
                <Text style={styles.placeDescription} >{props.selectedService.description}</Text>
            </View>
        )
    }

    return (
        <ScrollView >
            {modalContent}
            <View style={styles.associateButton}>
                <ButtonWithBackground
                    onPress={props.onAssociationAction} 
                    color="#2966ff"
                >
                    Associate
                </ButtonWithBackground>
            </View>
        </ScrollView>
    )
}

/*
        <Modal
            visible={!!props.selectedService}
            animationType="slide"
            onRequestClose={() => { props.navigation.pop() }}
        >
        <ScrollView style={styles.modalContainer} >
        {modalContent}
        <View>
            <TouchableOpacity onPress={props.onItemDeleted} >
                <View style={styles.deleteButton} >
                    <Icon size={30} name="ios-trash" color="red" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { props.navigation.pop() }} >
                <View style={styles.deleteButton} >
                    <Icon size={30} name="ios-close-circle" color="blue" />
                </View>
            </TouchableOpacity>
        </View>
    </ScrollView>
  </Modal>
)
*/

const styles = StyleSheet.create({
    modalContainer: {
        margin: 22
    },
    associateButton: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    placeDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeImage: {
        // height: 200,
        margin: 15,
        aspectRatio: 3/2,
        width: "70%"
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28
    },
    placeDescription: {
        margin: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    deleteButton: {
        alignItems: 'center',
    }
})

export default withMappedNavigationProps()(placeDetail)