import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OtherIcons} from '../../constant/images';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {generateImageUrl} from '../../Redux/baseApis';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {ScreenParamsType} from '../../utils/types/ScreenParamsType';
import {IBusiness} from '../../utils/types/Types';

const BusinessCard = ({
  item,
  width = 250,
  height = 170,
}: {
  item: IBusiness;
  width?: any;
  height?: any;
}) => {
  const {themeColors} = useGlobalContext();
  const navigate = useNavigation<StackNavigationProp<ScreenParamsType>>();
  const imageSource = item?.banner
    ? {uri: generateImageUrl(item.banner)}
    : (OtherIcons.Logo as ImageSourcePropType);
  const address = [
    item?.address?.street_address,
    item?.address?.upazilas,
    item?.address?.districts,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <TouchableOpacity
      onPress={() =>
        navigate.navigate('Stacks', {
          screen: 'Details',
          params: {id: item?._id?.toString()},
        })
      }
      activeOpacity={0.84}
      style={[
        styles.card,
        {
          backgroundColor: themeColors.constWhite as string,
          borderColor: hexToRGBA(themeColors.black as string, 0.08),
        },
      ]}>
      <Image
        source={imageSource}
        resizeMode="cover"
        style={[styles.image, {width, height}]}
      />
      <Text
        numberOfLines={1}
        style={[
          styles.badge,
          {backgroundColor: hexToRGBA(themeColors.black as string, 0.76)},
        ]}>
        Rating {item?.rating ? item.rating.toFixed(1) : '0.0'} /{' '}
        {item?.business_category || 'Salon'}
      </Text>
      <View style={styles.body}>
        <Text
          numberOfLines={1}
          style={[styles.name, {color: themeColors.black as string}]}>
          {item?.name}
        </Text>
        <Text
          numberOfLines={2}
          style={[
            styles.address,
            {color: hexToRGBA(themeColors.black as string, 0.68)},
          ]}>
          {address || 'Address not available'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BusinessCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    color: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '800',
    overflow: 'hidden',
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
  },
  address: {
    fontSize: 12,
    lineHeight: 17,
  },
});
