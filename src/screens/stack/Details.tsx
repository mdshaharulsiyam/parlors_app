import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Details = ({route}: any) => {
  const {id} = route?.params;
  return (
    <View>
      <Text>Details Page</Text>
      <Text>ID: {id}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
