import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {generateImageUrl} from '../../Redux/baseApis';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {ICategory} from '../../utils/types/Types';

const CategoryCard = ({item}: {item: ICategory}) => {
  const {themeColors} = useGlobalContext();
  return (
    <View
      style={[
        {
          backgroundColor: hexToRGBA(themeColors.black as string, 0.1),
        },
        styles.card,
      ]}>
      <Image
        resizeMode="cover"
        source={{uri: generateImageUrl(item?.img)}}
        style={[styles.image]}
      />
      <View
        style={[
          styles.textContainer,
          {
            backgroundColor: hexToRGBA(themeColors.white as string, 0.5),
          },
        ]}>
        <Text
          style={[
            {
              color: themeColors.black as string,
            },
            styles.text,
          ]}>
          {item?.name}
        </Text>
      </View>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
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
    textAlign: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
