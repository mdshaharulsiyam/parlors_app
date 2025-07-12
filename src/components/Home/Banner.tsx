import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGet_bannersQuery } from '../../Redux/Apis/bannerApis';
import { generateImageUrl } from '../../Redux/baseApis';
import { Ratio3_2 } from '../../utils/calculateHeight';
import { ScreenParamsType } from '../../utils/types/ScreenParamsType';
import Empty from '../Shared/Empty';
import Loader from '../Shared/Loader';

const { width } = Dimensions.get('window');

const Banner = ({ refreshing }: { refreshing: boolean }) => {
  const { data, isLoading, isFetching, refetch } = useGet_bannersQuery(undefined)
  const flatListRef = useRef<FlatList<any> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigation<DrawerNavigationProp<ScreenParamsType>>();
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % data?.data?.length;
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
  }, [data?.data?.length]);
  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  if (isLoading || isFetching) {
    return <Loader />
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
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        snapToAlignment="center"
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <Image
                source={{ uri: generateImageUrl(item?.img) }}
                style={styles.image}
              />
            </TouchableOpacity>
          )
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
