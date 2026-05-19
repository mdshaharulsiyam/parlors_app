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
import {IParlor} from '../../utils/types/Types';

const ParlorCard = ({
  item,
  width = 250,
  height = 170,
  horizontal = false,
}: {
  item: IParlor;
  width?: any;
  height?: any;
  horizontal?: boolean;
}) => {
  const {themeColors} = useGlobalContext();
  const navigate = useNavigation<StackNavigationProp<ScreenParamsType>>();
  const imageSource = item?.img
    ? {uri: generateImageUrl(item.img)}
    : (OtherIcons.Logo as ImageSourcePropType);

  return (
    <TouchableOpacity
      onPress={() =>
        navigate.navigate('Stacks', {
          screen: 'ServiceDetails',
          params: {id: item?._id?.toString()},
        })
      }
      activeOpacity={0.84}
      style={[
        styles.card,
        {
          backgroundColor: themeColors.constWhite as string,
          borderColor: hexToRGBA(themeColors.black as string, 0.08),
          maxWidth: width + 12,
          marginHorizontal: horizontal ? 5 : 0,
        },
      ]}>
      <Image
        source={imageSource}
        resizeMode="cover"
        style={[styles.image, {width, height}]}
      />
      <View style={styles.badgeRow}>
        <Text style={[styles.badge, styles.darkBadge]}>
          Rating {item?.rating ? item.rating.toFixed(1) : '0.0'}
        </Text>
        <Text
          style={[
            styles.badge,
            {backgroundColor: themeColors.primary as string},
          ]}>
          BDT {item?.price ?? 0}
        </Text>
      </View>
      <View style={styles.body}>
        <Text
          numberOfLines={1}
          style={[styles.name, {color: themeColors.black as string}]}>
          {item?.name}
        </Text>
        <View style={styles.serviceRow}>
          {item?.services?.slice(0, 3)?.map((service, index) => (
            <Text
              numberOfLines={1}
              style={[
                styles.servicePill,
                {
                  color: themeColors.black as string,
                  backgroundColor: hexToRGBA(
                    themeColors.primary as string,
                    0.09,
                  ),
                },
              ]}
              key={`${service}-${index}`}>
              {service}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ParlorCard;

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
  badgeRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  badge: {
    color: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '800',
    overflow: 'hidden',
  },
  darkBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 7,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
  },
  serviceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  servicePill: {
    maxWidth: '100%',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '600',
  },
});
