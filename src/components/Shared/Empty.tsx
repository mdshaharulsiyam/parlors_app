import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {OtherIcons} from '../../constant/images';

const Empty = ({data}: {data: any}) => {
  return !data || data?.data?.length === 0 ? (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Image
        source={OtherIcons.Empty as ImageSourcePropType}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </View>
  ) : null;
};

export default Empty;

const styles = StyleSheet.create({});
