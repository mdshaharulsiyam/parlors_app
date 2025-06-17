import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React from 'react';
import TabLayout from './TabLayout'; // Contains tab navigation

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
        options={{ headerShown: false }}
      />
      {/* <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="ShopManage"
        component={ShopManage}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
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
          headerShown: true,
          headerTitle: 'My Bookings',
        }}
      />
      <Drawer.Screen
        name="TextComponent"
        component={TextComponent}
        options={{
          headerShown: true,
          headerTitle: 'My Bookings',
        }}
      /> */}
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
        key={'Chat'}
        label="Chat"
        onPress={() => props.navigation.navigate('Chat')}
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
        onPress={() => props.navigation.navigate('Tabs', { screen: 'Stacks', params: { screen: 'SignIn' } })}
      />
      <DrawerItem
        label="Sign up"
        key={'SignUp'}
        onPress={() => props.navigation.navigate('Tabs', { screen: 'Stacks', params: { screen: 'SignUp' } })}
      />
      <DrawerItem
        key={'TextComponent'}
        label="Text Component"
        onPress={() => props.navigation.navigate('TextComponent')}
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
