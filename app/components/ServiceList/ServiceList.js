import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import ServiceItem from '../ServiceItem/ServiceItem'

const serviceList = (props) => (
    <FlatList style={styles.listContainer}
        data={props.services}
        onEndReached={() => {
            console.log('# onEndReached')
        }}
        onEndReachedThreshold={0}
        // onRefresh={() => console.log('# onRefresh')}
        renderItem={(info) => (
            <ServiceItem 
                serviceName={info.item.name}
                serviceImage={info.item.image}
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

export default serviceList
