import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Ratio3_2 } from '../../utils/calculateHeight'
import ParlorCard from './ParlorCard'

const ServiceFlatList = ({ horizontal = false, data, width }: { horizontal?: boolean, data: any, width: number }) => {
  return (
    <FlatList
      horizontal={horizontal}
      ListFooterComponent={<View style={{ height: 50 }} />}
      onEndReachedThreshold={0.5}
      numColumns={horizontal ? 1 : 2}
      {...(!horizontal && {
        columnWrapperStyle: {
          justifyContent: 'space-between',
          marginBottom: 10,
          gap: 10,
        },
      })}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={data || []}
      keyExtractor={item => item?._id}
      renderItem={({ item }) => (
        <ParlorCard
          horizontal={horizontal}
          key={item?._id}
          item={item}
          width={width / 2 - 30}
          height={Ratio3_2(width / 2 - 30)}
        />
      )}
    />
  )
}

export default ServiceFlatList

const styles = StyleSheet.create({})