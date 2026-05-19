import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Empty from '../../components/Shared/Empty';
import Loader from '../../components/Shared/Loader';
import ParlorCard from '../../components/Shared/ParlorCard';
import SearchFilterTrigger from '../../components/Shared/SearchFilterTrigger';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {useGetServicesQuery} from '../../Redux/Apis/seviceListingApis';
import {Ratio3_2} from '../../utils/calculateHeight';
import {hexToRGBA} from '../../utils/hexToRGBA';

const Parlors = () => {
  const params = useRoute()?.params as {search: string};
  const search = params?.search || '';
  const {width, height} = Dimensions.get('window');
  const {themeColors} = useGlobalContext();
  const {data, isLoading, isFetching} = useGetServicesQuery({
    limit: 10,
    page: 1,
    search,
  });
  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
        height,
      }}>
      <FlatList
        onEndReached={() => {}}
        ListHeaderComponent={
          <View
            style={[
              styles.header,
              {backgroundColor: hexToRGBA(themeColors.white as string, 0.98)},
            ]}>
            <SearchFilterTrigger />
          </View>
        }
        ListEmptyComponent={
          <Empty data={data?.data || []} label="No services found" />
        }
        stickyHeaderIndices={[0]}
        onEndReachedThreshold={0.5}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        showsVerticalScrollIndicator={false}
        data={data?.data || []}
        contentContainerStyle={styles.content}
        keyExtractor={item => item?._id}
        renderItem={({item}) => (
          <ParlorCard
            key={item?._id}
            item={item}
            width={width / 2 - 20}
            height={Ratio3_2(width / 2 - 20)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Parlors;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 92,
  },
  columns: {
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10,
  },
});
