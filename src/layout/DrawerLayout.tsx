import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import { useGlobalContext } from '../Provider/GlobalContextProvider';
import About from '../screens/drawer/About';
import Booking from '../screens/drawer/Booking';
import ChangePassword from '../screens/drawer/ChangePassword';
import Chat from '../screens/drawer/Chat';
import Privacy from '../screens/drawer/Privacy';
import Profile from '../screens/drawer/Profile';
import ShopManage from '../screens/drawer/ShopManage';
import { hexToRGBA } from '../utils/hexToRGBA';
import TabLayout from './TabLayout'; // Contains tab navigation

const Drawer = createDrawerNavigator();

const DrawerLayout = () => {
  const { themeColors } = useGlobalContext();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        drawerType: 'back',
      }}
      initialRouteName="Tabs">
      <Drawer.Screen
        name="Tabs"
        component={TabLayout}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true, headerStyle: {
            backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
            height: 50,
            borderBottomColor: hexToRGBA(themeColors.black as string, 0.2),
            borderWidth: .5,
          },
          headerTintColor: themeColors.black as string,
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: true, headerStyle: {
            backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
            height: 50
          },
          headerTintColor: themeColors.black as string,
        }}
      />
      <Drawer.Screen
        name="ShopManage"
        component={ShopManage}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Privacy"
        component={Privacy}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Booking"
        component={Booking}
        options={{
          headerTitle: "My Bookings",
          headerShown: true, headerStyle: {
            backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
            height: 60,
            borderBottomColor: hexToRGBA(themeColors.black as string, 0.2),
            borderWidth: .5,
          },
          headerTintColor: themeColors.black as string,
        }}
      />
      <Drawer.Screen
        name="changePassword"
        component={ChangePassword}
        options={{
          headerShown: true, headerStyle: {
            backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
            height: 50,
            borderBottomColor: hexToRGBA(themeColors.black as string, 0.2),
            borderWidth: .5,
          },
          headerTintColor: themeColors.black as string,
        }}
      />
    </Drawer.Navigator>
  );
};

// Custom Drawer Content Component
function DrawerContent(props: DrawerContentComponentProps) {
  const { themeColors } = useGlobalContext();
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), }}>
      {/* <DrawerItemList {...props} /> */}

      <DrawerItem
        style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), marginBottom: 10 }}
        labelStyle={{ color: themeColors.black as string }}
        key={'Chat'}
        label="Chat"
        onPress={() => props.navigation.navigate('Chat')}
      />
      <DrawerItem
        style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), marginBottom: 10 }}
        labelStyle={{ color: themeColors.black as string }}
        key={'Booking'}
        label="Booking"
        onPress={() => props.navigation.navigate('Booking')}
      />

      <DrawerItem
        style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), marginBottom: 10 }}
        labelStyle={{ color: themeColors.black as string }}
        label="Profile"
        key={'profile'}
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), marginBottom: 10 }}
        labelStyle={{ color: themeColors.black as string }}
        label="Manage Shop"
        key={'ShopManage'}
        onPress={() => props.navigation.navigate('ShopManage')}
      />
      <DrawerItem
        style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), marginBottom: 10 }}
        labelStyle={{ color: themeColors.black as string }}
        label="Sign in"
        key={'SignIn'}
        onPress={() => props.navigation.navigate('Tabs', { screen: 'Stacks', params: { screen: 'SignIn' } })}
      />
      <DrawerItem
        style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), marginBottom: 10 }}
        labelStyle={{ color: themeColors.black as string }}
        label="Sign up"
        key={'SignUp'}
        onPress={() => props.navigation.navigate('Tabs', { screen: 'Stacks', params: { screen: 'SignUp' } })}
      />
      <DrawerItem
        style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), marginBottom: 10 }}
        labelStyle={{ color: themeColors.black as string }}
        key={'changePassword'}
        label="Change Password"
        onPress={() => props.navigation.navigate('changePassword')}
      />
      <DrawerItem
        style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), marginBottom: 10 }}
        labelStyle={{ color: themeColors.black as string }}
        key={'Privacy'}
        label="Privacy"
        onPress={() => props.navigation.navigate('Privacy')}
      />
      <DrawerItem
        style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), marginBottom: 10 }}
        labelStyle={{ color: themeColors.black as string }}
        key={'about'}
        label="About"
        onPress={() => props.navigation.navigate('About')}
      />
      <DrawerItem
        style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), marginBottom: 10 }}
        labelStyle={{ color: themeColors.black as string }}
        key={'Close Drawer'}
        label="Close Drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
}

export default DrawerLayout;
