import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGet_bannersQuery} from '../../Redux/Apis/bannerApis';
import {generateImageUrl} from '../../Redux/baseApis';
import {Ratio3_2} from '../../utils/calculateHeight';
import Empty from '../Shared/Empty';
import Loader from '../Shared/Loader';

const {width} = Dimensions.get('window');

const Banner = ({refreshing}: {refreshing: boolean}) => {
  const {data, isLoading, isFetching, refetch} = useGet_bannersQuery(undefined);
  const flatListRef = useRef<FlatList<any> | null>(null);
  const [, setActiveIndex] = useState(0);
  const dataLength = data?.data?.length ?? 0;

  useEffect(() => {
    if (!dataLength) {
      return;
    }
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % dataLength;
        if (flatListRef.current) {
          flatListRef.current?.scrollToOffset({
            offset: nextIndex * width + 10 * nextIndex,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [dataLength]);
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
      <Empty data={data} />
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
                style={styles.image}
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
    width: width,
    height: Ratio3_2(width),
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default Banner;
