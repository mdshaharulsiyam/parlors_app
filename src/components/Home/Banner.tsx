import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {useGet_bannersQuery} from '../../Redux/Apis/bannerApis';
import {generateImageUrl} from '../../Redux/baseApis';
import {Ratio3_2} from '../../utils/calculateHeight';
import Empty from '../Shared/Empty';
import Loader from '../Shared/Loader';

const Banner = ({refreshing}: {refreshing: boolean}) => {
  const {width} = useGlobalContext();
  const {data, isLoading, isFetching, refetch} = useGet_bannersQuery(undefined);
  const flatListRef = useRef<FlatList<any> | null>(null);
  const [, setActiveIndex] = useState(0);
  const dataLength = data?.data?.length ?? 0;
  const cardWidth = width - 24;

  useEffect(() => {
    if (!dataLength) {
      return;
    }
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % dataLength;
        if (flatListRef.current) {
          flatListRef.current?.scrollToOffset({
            offset: nextIndex * cardWidth + 10 * nextIndex,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [cardWidth, dataLength]);
  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refetch, refreshing]);

  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <View>
      <Empty data={data} label="No promotions available" />
      <FlatList
        ref={flatListRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data?.data || []}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
        viewabilityConfig={{itemVisiblePercentThreshold: 70}}
        snapToAlignment="center"
        renderItem={({item}) => {
          return (
            <TouchableOpacity>
              <Image
                source={{uri: generateImageUrl(item?.img)}}
                style={[
                  styles.image,
                  {width: cardWidth, height: Ratio3_2(cardWidth)},
                ]}
              />
            </TouchableOpacity>
          );
        }}
        // onMomentumScrollEnd={event => {
        //   const index = Math.round(event.nativeEvent.contentOffset.x / width);
        //   setActiveIndex(index);
        // }}
        // onScroll={handleScroll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  text: {
    fontSize: 16,
  },
});

export default Banner;
