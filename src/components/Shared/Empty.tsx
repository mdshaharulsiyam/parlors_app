import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {OtherIcons} from '../../constant/images';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';

const hasNoData = (data: any) => {
  if (!data) {
    return true;
  }
  if (Array.isArray(data)) {
    return data.length === 0;
  }
  if (Array.isArray(data?.data)) {
    return data.data.length === 0;
  }
  return false;
};

const Empty = ({data, label = 'Nothing to show yet'}: {data: any; label?: string}) => {
  const {themeColors} = useGlobalContext();
  return hasNoData(data) ? (
    <View style={styles.container}>
      <Image
        source={OtherIcons.Empty as ImageSourcePropType}
        style={styles.image}
      />
      <Text style={[styles.text, {color: hexToRGBA(themeColors.black, 0.58)}]}>
        {label}
      </Text>
    </View>
  ) : null;
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  image: {
    width: 86,
    height: 86,
    opacity: 0.72,
  },
  text: {
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
  },
});
