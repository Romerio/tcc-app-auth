import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    StyleSheet,
    Platform
} from 'react-native'

const buttonWithBackground = props => {
    const content = (
        <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabled : null]} >
            <Text style={props.disabled ? styles.disabledText : styles.text} >{props.children}</Text>
        </View>)

    if(props.disabled) {
        return content
    }

    if(Platform.OS === 'androidd'){
        return (
            <TouchableNativeFeedback onPress={props.onPress} >
                {content}
            </TouchableNativeFeedback> 
        )
    }

    return (
        <TouchableOpacity onPress={props.onPress} >
            {content}
        </TouchableOpacity> 
    )    
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 4,
        borderWidth: 0.2,
        borderColor: 'black'
    },  
    text: {
        color: '#fff'
    },
    disabled: {
        backgroundColor: '#eee',
        borderColor: '#aaa'
    },
    disabledText: {
        color: '#aaa',
    }
})

export default buttonWithBackground