import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerLayout from './DrawerLayout';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import GlobalContextProvider from '../Provider/GlobalContextProvider';

const Root = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GlobalContextProvider>
        <DrawerLayout />
      </GlobalContextProvider>
    </NavigationContainer>
  );
};

export default Root;
