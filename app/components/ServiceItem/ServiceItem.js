import React from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image 
} from 'react-native'

const listitem = (props) => (
    <TouchableOpacity  onPress={props.onItemPressed} >
        <View style={styles.listItem}>
            <Image 
                source={{uri: props.serviceImage}} 
                resizeMode="cover"
                style={styles.serviceImage}
            />
            <Text>{props.serviceName}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10,
        marginBottom: 5,
        backgroundColor: "#eee",
        flexDirection: 'row',
        alignItems: 'center',
    },
    serviceImage: {
        marginRight: 8,
        height: 30,
        width: 30
    }
})

export default listitem