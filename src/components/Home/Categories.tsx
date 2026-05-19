import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {useGetCategoriesQuery} from '../../Redux/Apis/categoryApis';
import {commonStyles} from '../../utils/styles/Styles';
import CategoryCard from '../Shared/CategoryCard';
import Empty from '../Shared/Empty';
import Loader from '../Shared/Loader';

const Categories = ({refreshing}: {refreshing: boolean}) => {
  const {themeColors} = useGlobalContext();
  const ref = useRef<FlatList<any | null>>(null);
  const [, setIndex] = useState(0);
  const {data, isLoading, isFetching, refetch} = useGetCategoriesQuery({
    page: 1,
    limit: 20,
  });
  const dataLength = data?.data?.length ?? 0;
  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refetch, refreshing]);
  useEffect(() => {
    if (!dataLength) {
      return;
    }
    const interval = setInterval(() => {
      setIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % dataLength;
        if (ref.current) {
          ref.current?.scrollToOffset({
            offset: nextIndex * 100 + 10 * nextIndex,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [dataLength]);

  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <View style={{paddingHorizontal: 5}}>
      <Text
        style={[commonStyles.headerText, {color: themeColors.black as string}]}>
        Categories
      </Text>
      <Empty data={data} />
      <FlatList
        ref={ref}
        data={data?.data || []}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 10}}
        keyExtractor={item => item?._id}
        renderItem={({item}) => <CategoryCard item={item} />}
      />
    </View>
  );
};

export default Categories;
