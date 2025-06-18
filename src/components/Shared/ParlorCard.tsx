import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
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
  console.log(width, height);
  const { themeColors } = useGlobalContext();
  const navigate = useNavigation<StackNavigationProp<ScreenParamsType>>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate.navigate('Stacks', {
          screen: 'Details',
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
      }}>
      <Image
        source={{ uri: item?.img }}
        resizeMode="cover"
        style={[
          {
            width: width,
            height: height,
            borderRadius: 5,
          },
        ]}
      />
      <View style={{ marginLeft: 10, padding: 6 }}>
        <Text style={{ fontWeight: 'bold', color: themeColors.black as string }}>{item?.name}</Text>
        <Text style={{ color: themeColors.black as string, marginVertical: 2 }}>{item?.address}</Text>
        <Text style={{ color: themeColors.black as string }}>{item?.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ParlorCard;
