import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useGlobalContext } from '../Provider/GlobalContextProvider';
import Forget from '../screens/stack/Forget';
import Reset from '../screens/stack/Reset';
import SignIn from '../screens/stack/SignIn';
import SignUp from '../screens/stack/SignUp';
import Verify from '../screens/stack/Verify';

const Stack = createNativeStackNavigator();

const StackLayout = () => {
  const { themeColors } = useGlobalContext();
  return (
    <Stack.Navigator >
      {/* <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: true,
          headerTransparent: true,
          title: "Sign In",
          headerTitleAlign: 'center',

          headerTitleStyle: {
            color: themeColors.black as string,
          },
          headerTintColor: themeColors.black as string,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: true,
          headerTransparent: true,
          title: "Sign Up",
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: themeColors.black as string,
          },
          headerTintColor: themeColors.black as string,
        }}
      />
      <Stack.Screen
        name="Forget"
        component={Forget}
        options={{
          headerShown: true,
          headerTransparent: true,
          title: "Forget Password",
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: themeColors.black as string,
          },
          headerTintColor: themeColors.black as string,
        }}
      />
      <Stack.Screen
        name="Reset"
        component={Reset}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{ headerShown: false }}
      />
      {/* 
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
