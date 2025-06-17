import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
const TextComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: 'https://github.com/facebook/react-native'
        }}
        style={{ marginTop: 20 }}
      />

    </View>
  )
}

export default TextComponent

const styles = StyleSheet.create({})