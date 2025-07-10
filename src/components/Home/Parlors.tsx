import React from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useGetServicesQuery } from '../../Redux/Apis/seviceListingApis';
import { Ratio3_2 } from '../../utils/calculateHeight';
import { commonStyles } from '../../utils/styles/Styles';
import ParlorCard from '../Shared/ParlorCard';

const Parlors = ({ horizontal = false }: { horizontal?: boolean }) => {
  const { width } = Dimensions.get('window');
  const { themeColors } = useGlobalContext();
  const { data } = useGetServicesQuery({ limit: 10, page: 1 });
  return (
    <SafeAreaView style={{ paddingHorizontal: 5, }}>
      <Text style={[commonStyles.headerText, { color: themeColors.black as string }]}>
        Services
      </Text>
      <FlatList
        horizontal={horizontal}
        ListFooterComponent={<View style={{ height: 50 }} />}
        onEndReached={e => {
          //console.log(e);
        }}
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
