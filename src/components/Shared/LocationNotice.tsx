import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';

const LocationNotice = () => {
  const {themeColors} = useGlobalContext();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: themeColors.black as string,
          },
        ]}>
        📍 Location Notice
      </Text>
      <Text
        style={[
          styles.description,
          {
            color: themeColors.black as string,
          },
        ]}>
        Your current location will be saved as your shop location. If this is
        not your actual shop, please go to your shop and then create your
        account.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderLeftWidth: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default LocationNotice;
