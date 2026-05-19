import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';

const Loader = () => {
  const {themeColors} = useGlobalContext();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={themeColors.black as string} />
    </View>
  );
};

export default Loader;
