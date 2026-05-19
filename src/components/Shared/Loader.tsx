import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';

const Loader = () => {
  const {themeColors} = useGlobalContext();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={themeColors.primary as string} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
