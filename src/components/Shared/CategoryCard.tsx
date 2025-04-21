import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ICategory} from '../../utils/types/Types';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';

const CategoryCard = ({item}: {item: ICategory}) => {
  const {themeColors} = useGlobalContext();
  return (
    <View
      style={[
        {
          backgroundColor: themeColors.background,
        },
        styles.card,
      ]}>
      <Image
        resizeMode="contain"
        source={{uri: item?.img}}
        style={[styles.image]}
      />
      <View
        style={[
          styles.textContainer,
          {
            backgroundColor: themeColors.background,
          },
        ]}>
        <Text
          style={[
            {
              color: themeColors.text,
            },
            styles.text,
          ]}>
          {item?.category}
        </Text>
      </View>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
