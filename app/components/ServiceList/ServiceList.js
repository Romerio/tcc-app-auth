import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ActionButton from 'react-native-action-button';
import { withNavigation } from 'react-navigation';

import ServiceItem from '../ServiceItem/ServiceItem'
import Swipeout from 'react-native-swipeout';

let swipeBtns = [{
    text: 'Delete',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => { console.log('swipeBtns press') }
}];

/*
// Buttons
let swipeBtns = [{
    text: 'Delete',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => { console.log('swipeBtns press') }
}];

    <Swipeout wipeout right={swipeBtns}
        autoClose={true}
        backgroundColor= 'transparent'>
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
    </Swipeout>
*/

const serviceList = (props) => {
    const renderFlatItem = (info, enableSwipeout = false) => {
        let flatItemContent = (
            <ServiceItem
                serviceName={info.item.name}
                serviceImage={info.item.image}
                onItemPressed={() => props.onItemSelected(info.item.key)}
            />
        )
    
        if(enableSwipeout) {
            flatItemContent = (
                <Swipeout wipeout right={swipeBtns}
                    autoClose={true}
                    backgroundColor= 'transparent'>
                    <ServiceItem
                        serviceName={info.item.name}
                        serviceImage={info.item.image}
                        onItemPressed={() => props.onItemSelected(info.item.key)}
                    />
                </Swipeout>
            )
        }
    
        return flatItemContent
    }

    return (
            <View style={{height: '100%'}}>
            <FlatList style={styles.listContainer}
                data={props.services}
                onEndReached={() => {
                    console.log('# onEndReached')
                }}
                onEndReachedThreshold={0}
                // onRefresh={() => console.log('# onRefresh')}
                renderItem={(info) => renderFlatItem(info, props.enableSwipeout)}
            />
            {props.showAddButton
            ? 
                <ActionButton 
                    buttonColor="#3498db" 
                    style={{zIndex: 1}}
                    onPress={() => props.navigation.navigate('ServiceManager', { tabPresentationMode: false })}
                />
            : null
            }

        </View>
    )
}

/*
        <ActionButton buttonColor="rgba(231,76,60,1)" style={{zIndex: 3}}
            onPress={() => console.log("notes tapped!")}
        >
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

        <TouchableOpacity
            style={[styles.buttonIcon, styles.buttomPosition]}
            onPress={() => console.log('click')}
        >
            <Text style={styles.buttonText} >+</Text>
        </TouchableOpacity>
*/

const styles = StyleSheet.create({
    listContainer: {
      zIndex: 1,
      width: "100%",
      zIndex: 0
    },
    /*buttonText: {
        zIndex: 2,
        color: 'white',
        fontSize: 22,
    },
    buttonIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#7799ff',
        alignItems: 'center',
        justifyContent:'center',
    },
    buttomPosition: {
        zIndex: 1,
        position: 'absolute',
        bottom: 20,
        right: 20
    },*/
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
  });

export default withNavigation(serviceList);