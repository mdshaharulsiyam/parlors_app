import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ICord, useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useGetVendorQuery } from '../../Redux/Apis/vendorApis';
import { commonStyles } from '../../utils/styles/Styles';
import BusinessCard from '../Shared/BusinessCard';
import Empty from '../Shared/Empty';
import Loader from '../Shared/Loader';


const TopBerber = () => {
  const { themeColors, cord, width } = useGlobalContext();
  const [initialCord, setInitialCord] = useState<ICord | null>(cord);

  const { data, isLoading, isFetching } = useGetVendorQuery({ sort: 'rating', order: 'desc', top: true, coordinates: initialCord ? JSON.stringify([initialCord?.lat, initialCord?.lng]) : undefined });

  useEffect(() => {
    if (data && data?.data?.length === 0 && cord) {
      setInitialCord(null);
    }
  }, [data, cord])

  if (isLoading || isFetching) {
    return <Loader />
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
