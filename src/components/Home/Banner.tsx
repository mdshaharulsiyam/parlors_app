import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenParamsType} from '../../utils/types/ScreenParamsType';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const {width} = Dimensions.get('window');

const data = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 1',
  'Item 2',
  'Item 3',
];
const Banner = () => {
  const flatListRef = useRef<FlatList<any> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigation<DrawerNavigationProp<ScreenParamsType>>();
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {x: scrollX}}}],
    {useNativeDriver: false},
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % data.length;
        if (flatListRef.current) {
          flatListRef.current?.scrollToOffset({
            offset: nextIndex * width + 10 * nextIndex,
            animated: true,
          });
        }

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        onRefresh={() => {}}
        refreshing={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled={true}
        viewabilityConfig={{itemVisiblePercentThreshold: 70}}
        snapToAlignment="center"
        renderItem={({item}) => (
          <TouchableOpacity>
            <Image
              source={{uri: 'https://placehold.co/400x400.png'}}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
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
    height: 300,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default Banner;
