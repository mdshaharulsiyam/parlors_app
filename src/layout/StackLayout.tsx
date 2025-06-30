import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useGlobalContext } from '../Provider/GlobalContextProvider';
import Details from '../screens/stack/Details';
import Forget from '../screens/stack/Forget';
import Messages from '../screens/stack/Messages';
import Reset from '../screens/stack/Reset';
import ServiceAddEdit from '../screens/stack/ServiceAddEdit';
import SignIn from '../screens/stack/SignIn';
import SignUp from '../screens/stack/SignUp';
import Verify from '../screens/stack/Verify';

const Stack = createNativeStackNavigator();

const StackLayout = () => {
  const { themeColors } = useGlobalContext();
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="ServiceAddEdit"
        component={ServiceAddEdit}
        options={{
          headerShown: false,
        }}
      />
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
        options={{
          headerShown: true,
          headerTransparent: true,
          title: "Reset Password",
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: themeColors.black as string,
          },
          headerTintColor: themeColors.black as string,
        }}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{
          headerShown: true,
          headerTransparent: true,
          title: "Verify Email",
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: themeColors.black as string,
          },
          headerTintColor: themeColors.black as string,
        }}
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
      />
    </Stack.Navigator>
  );
};

export default StackLayout;
