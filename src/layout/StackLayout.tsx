import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Checkout from '../screens/stack/Checkout';
import Details from '../screens/stack/Details';
import Forget from '../screens/stack/Forget';
import Messages from '../screens/stack/Messages';
import Reset from '../screens/stack/Reset';
import Verify from '../screens/stack/Verify';

const Stack = createNativeStackNavigator();

const StackLayout = () => {
  return (
    <Stack.Navigator initialRouteName="Checkout">
      {/* <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Reset"
        component={Reset}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Verify"
        component={Verify}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forget"
        component={Forget}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default StackLayout;
