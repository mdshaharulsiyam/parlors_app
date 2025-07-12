import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import GlobalContextProvider from '../Provider/GlobalContextProvider';
import {store} from '../Redux/store';
import DrawerLayout from './DrawerLayout';

const Root = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <Provider store={store}>
          <GlobalContextProvider>
            <DrawerLayout /> <Toast />
          </GlobalContextProvider>
        </Provider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Root;
