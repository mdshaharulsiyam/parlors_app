import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import TabLayout from './TabLayout'; // Contains tab navigation
import Profile from '../screens/drawer/Profile';
import Cart from '../screens/drawer/Cart';
import About from '../screens/drawer/About';
import SignIn from '../screens/drawer/SignIn';
import Booking from '../screens/drawer/Booking';
import SignUp from '../screens/drawer/SignUp';
import ShopManage from '../screens/drawer/ShopManage';

const Drawer = createDrawerNavigator();

const DrawerLayout = () => {
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
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="ShopManage"
        component={ShopManage}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Booking"
        component={Booking}
        options={{
          headerShown: true,
          headerTitle: 'My Bookings',
        }}
      />
    </Drawer.Navigator>
  );
};

// Custom Drawer Content Component
function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        key={'about'}
        label="About"
        onPress={() => props.navigation.navigate('About')}
      />
      <DrawerItem
        key={'Booking'}
        label="Booking"
        onPress={() => props.navigation.navigate('Booking')}
      />
      <DrawerItem
        key={'cart'}
        label="Cart"
        onPress={() => props.navigation.navigate('Cart')}
      />
      <DrawerItem
        label="Profile"
        key={'profile'}
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Manage Shop"
        key={'ShopManage'}
        onPress={() => props.navigation.navigate('ShopManage')}
      />
      <DrawerItem
        label="Sign in"
        key={'SignIn'}
        onPress={() => props.navigation.navigate('SignIn')}
      />
      <DrawerItem
        label="Sign up"
        key={'SignUp'}
        onPress={() => props.navigation.navigate('SignUp')}
      />
      <DrawerItem
        key={'Close Drawer'}
        label="Close Drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
}

export default DrawerLayout;
