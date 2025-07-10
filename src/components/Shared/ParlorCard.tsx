import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { generateImageUrl } from '../../Redux/baseApis';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { ScreenParamsType } from '../../utils/types/ScreenParamsType';
import { IParlor } from '../../utils/types/Types';

const ParlorCard = ({
  item,
  width = 250,
  height = 170,
}: {
  item: IParlor;
  width?: any;
  height?: any;
}) => {
  const { themeColors } = useGlobalContext();
  const navigate = useNavigation<StackNavigationProp<ScreenParamsType>>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate.navigate('Stacks', {
          screen: 'ServiceDetails',
          params: { id: item?._id?.toString() },
        })
      }
      activeOpacity={0.8}
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: hexToRGBA(themeColors.black as string, 0.1),
        padding: 5,
        borderRadius: 5,
        boxSizing: 'border-box',
        maxWidth: width + 10,
        position: 'relative',
      }}>
      <Image
        source={{ uri: generateImageUrl(item?.img) }}
        resizeMode="cover"
        style={[
          {
            width: width,
            height: height,
            borderRadius: 5,
          },
        ]}
      />
      <Text style={{ color: themeColors.white as string, position: 'absolute', top: 10, right: 10, backgroundColor: themeColors.black as string, padding: 5, borderRadius: 5, opacity: 0.8, fontWeight: 'bold' }}>{item?.rating?.toFixed(2)}⭐</Text>
      <Text style={{ color: themeColors.white as string, position: 'absolute', top: 10, left: 10, backgroundColor: themeColors.black as string, padding: 5, borderRadius: 5, opacity: 0.8, fontWeight: 'bold' }}>৳ {item?.price}</Text>
      <View style={{ marginLeft: 10, paddingVertical: 6 }}>
        <Text style={{ fontWeight: 'bold', color: themeColors.black as string, marginBottom: 5 }}>{item?.name}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
          {
            item?.services?.map((service, index) => (
              <Text style={{
                color: themeColors.black as string,
                padding: 2,
                paddingHorizontal: 5,
                borderRadius: 5,
                backgroundColor: hexToRGBA(themeColors.black as string, 0.1),
              }} key={index}>{service}</Text>
            ))
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ParlorCard;
