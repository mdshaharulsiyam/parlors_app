import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ParlorCard from '../../components/Shared/ParlorCard';
import SearchFilterTrigger from '../../components/Shared/SearchFilterTrigger';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useGetServicesQuery } from '../../Redux/Apis/seviceListingApis';
import { Ratio3_2 } from '../../utils/calculateHeight';
import { hexToRGBA } from '../../utils/hexToRGBA';

const Parlors = () => {
  const params = useRoute()?.params as { search: string };
  const [search, setSearch] = React.useState(params?.search || '');
  const { width, height } = Dimensions.get('window');
  const { themeColors, } = useGlobalContext();
  const { data } = useGetServicesQuery({ limit: 10, page: 1 });
  return (
    <SafeAreaView style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), paddingHorizontal: 5, height }}>
      <FlatList
        onEndReached={e => {
          //console.log(e);
        }}
        ListHeaderComponent={() => <SearchFilterTrigger />}
        stickyHeaderIndices={[0]}
        onEndReachedThreshold={0.5}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 10,
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
        data={data?.data || []}
        keyExtractor={item => item?._id}
        renderItem={({ item }) => (
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
  headerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
  },
});
