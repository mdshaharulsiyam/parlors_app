import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useGetVendorQuery } from '../../Redux/Apis/vendorApis';
import { commonStyles } from '../../utils/styles/Styles';
import BusinessCard from '../Shared/BusinessCard';
import Empty from '../Shared/Empty';
import Loader from '../Shared/Loader';

const TopBerber = ({ refreshing, setRefreshing }: { refreshing: boolean, setRefreshing: (arg1: boolean) => void }) => {
  const { themeColors, cord } = useGlobalContext();
  const [useFallback, setUseFallback] = useState(false);

  const coordinates = useMemo(() => {
    if (useFallback || !cord) return undefined;
    return JSON.stringify([cord.lng, cord.lat]);
  }, [cord, useFallback]);

  const { data, isLoading, isFetching, refetch } = useGetVendorQuery({
    sort: 'rating',
    order: 'desc',
    top: true,
    coordinates,
  });

  useEffect(() => {
    if (!useFallback && data?.data?.length === 0 && cord) {
      setUseFallback(true);
    }
  }, [data, cord, useFallback]);
  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);
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
