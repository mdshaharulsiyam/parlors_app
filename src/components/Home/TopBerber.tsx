import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useGetVendorQuery } from '../../Redux/Apis/vendorApis';
import { commonStyles } from '../../utils/styles/Styles';
import BusinessCard from '../Shared/BusinessCard';
import Empty from '../Shared/Empty';


const TopBerber = () => {
  const { themeColors, cord, width } = useGlobalContext();
  const { data, isLoading } = useGetVendorQuery({ sort: 'rating', order: 'desc', top: true, coordinates: cord ? JSON.stringify([12.34, 56.78]) : undefined });
  if (isLoading) {
    return <ActivityIndicator size={"large"} color={themeColors.black as string} />
  }
  return (
    <View style={{ paddingHorizontal: 5 }}>
      <View>
        <Text style={[commonStyles.headerText, { color: themeColors.black as string }]}>
          Top Vendors
        </Text>
      </View>
      <Empty data={data} />
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
