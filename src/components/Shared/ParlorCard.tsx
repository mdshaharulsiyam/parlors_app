import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
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
          screen: 'Details',
          params: { id: item?._id?.toString() },
        })
      }
      activeOpacity={0.8}
      style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: themeColors.background,
        padding: 10,
        borderRadius: 5,
        boxSizing: 'border-box',
      }}>
      <Image
        source={{ uri: item?.img }}
        resizeMode="contain"
        style={[
          {
            width: width,
            height: height,
            borderRadius: 5,
          },
        ]}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{item?.name}</Text>
        <Text>{item?.address}</Text>
        <Text>{item?.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ParlorCard;
