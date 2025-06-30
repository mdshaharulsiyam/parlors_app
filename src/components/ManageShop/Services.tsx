import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { Ratio3_2 } from '../../utils/calculateHeight';
import { topBarbers } from '../Home/Parlors';
import GradientButton from '../Shared/GradientButton';
import ParlorCard from '../Shared/ParlorCard';

const Services = () => {
  const { width, themeColors } = useGlobalContext();
  return (
    <FlatList
      ListFooterComponent={<View style={{ height: 50 }} />}
      ListHeaderComponent={<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
        <GradientButton handler={() => { }}>
          <Text style={{ color: themeColors.constWhite as string }}>Add Service</Text>
        </GradientButton>
      </View>}
      onEndReached={e => {
        //console.log(e);
      }}
      onEndReachedThreshold={0.5}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        marginBottom: 10,
        gap: 10,
      }}
      showsVerticalScrollIndicator={false}
      data={topBarbers}
      keyExtractor={item => item?._id}
      renderItem={({ item }) => (
        <ParlorCard
          key={item?._id}
          item={item}
          width={width / 2 - 30}
          height={Ratio3_2(width / 2 - 30)}
        />
      )}

    />
  )
}

export default Services

const styles = StyleSheet.create({})