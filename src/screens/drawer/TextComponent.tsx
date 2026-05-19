import React from 'react';
import {View} from 'react-native';
import WebView from 'react-native-webview';
const TextComponent = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{
          uri: 'https://personal-shop-ten.vercel.app/login',
        }}
        onMessage={_event => {
          //console.log('Message from WebView:', event?.nativeEvent?.data);
        }}
        javaScriptEnabled={true}
        style={{marginTop: 20}}
      />

      <WebView
        originWhitelist={['*']}
        source={{
          uri: 'https://ammur.vercel.app/auth/sign-in',
        }}
        onMessage={_event => {
          //console.log('Message from WebView:', event?.nativeEvent?.data);
        }}
        javaScriptEnabled={true}
        style={{marginTop: 20}}
      />
    </View>
  );
};

export default TextComponent;
