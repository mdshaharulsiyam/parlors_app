import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useGetVendorQuery } from '../../Redux/Apis/vendorApis';
import { commonStyles } from '../../utils/styles/Styles';
import BusinessCard from '../Shared/BusinessCard';


const TopBerber = () => {
  const { themeColors, cord } = useGlobalContext();
  const { data } = useGetVendorQuery({ sort: 'rating', order: 'desc', top: true, coordinates: cord ? [cord.lat, cord.lng] : undefined });
  return (
    <View style={{ paddingHorizontal: 5 }}>
      <View>
        <Text style={[commonStyles.headerText, { color: themeColors.black as string }]}>
          Top Vendors
        </Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data?.data || []}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={item => item?._id}
        renderItem={({ item }) => <BusinessCard item={item} height={188} />}
      />
    </View>
  );
};

export default TopBerber;
