import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import ListItem from '../ListItem/ListItem'

import imagePlaceHouder from '../../assets/background-1.jpg'

const placeList = (props) => (
    <FlatList style={styles.listContainer}
        data={props.places}
        onEndReached={() => {
            console.log('# onEndReached')
        }}
        onRefresh={() => console.log('# onRefresh')}
        renderItem={(info) => (
            <ListItem 
                placeName={info.item.name}
                placeImage={info.item.image}
                onItemPressed={() => props.onItemSelected(info.item.key)}
            />
        )}    
    />
)

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    },
  });

export default placeList
