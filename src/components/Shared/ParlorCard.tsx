import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IParlor} from '../../utils/types/Types';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';

const ParlorCard = ({
  item,
  width = 250,
  height = 170,
}: {
  item: IParlor;
  width?: any;
  height?: any;
}) => {
  const {themeColors} = useGlobalContext();
  return (
    <View
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
        source={{uri: item?.img}}
        resizeMode="contain"
        style={[
          {
            width: width,
            height: height,
            borderRadius: 5,
          },
        ]}
      />
      <View style={{marginLeft: 10}}>
        <Text style={{fontWeight: 'bold'}}>{item?.name}</Text>
        <Text>{item?.address}</Text>
        <Text>{item?.category}</Text>
      </View>
    </View>
  );
};

export default ParlorCard;
