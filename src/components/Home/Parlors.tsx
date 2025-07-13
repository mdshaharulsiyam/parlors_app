import React, { useEffect } from 'react';
import { Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useGetServicesQuery } from '../../Redux/Apis/seviceListingApis';
import { commonStyles } from '../../utils/styles/Styles';
import Empty from '../Shared/Empty';
import Loader from '../Shared/Loader';
import ServiceFlatList from '../Shared/ServiceFlatList';

const Parlors = ({
  horizontal = false,
  refreshing,
}: {
  horizontal?: boolean;
  refreshing?: boolean;
}) => {
  const { width } = Dimensions.get('window');
  const { themeColors } = useGlobalContext();

  const { data, isLoading, isFetching, refetch } = useGetServicesQuery({
    limit: 20,
    page: 1,
  });
  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={{ paddingHorizontal: 5, marginBottom: 10 }}>
      <Text
        style={[commonStyles.headerText, { color: themeColors.black as string }]}>
        Services
      </Text>
      <Empty data={data} />
      <ServiceFlatList horizontal={horizontal} data={data?.data || []} width={width} />
    </SafeAreaView>
  );
};

export default Parlors;
