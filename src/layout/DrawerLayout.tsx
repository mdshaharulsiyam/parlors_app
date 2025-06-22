import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React, { useMemo } from 'react';
import NameImage from '../components/Shared/NameImage';
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

  const headerBaseStyle = (height: number) => ({
    backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
    height,
    borderBottomColor: hexToRGBA(themeColors.black as string, 0.2),
    borderWidth: 0.5,
  });

  const screens = useMemo(() => [
    {
      name: 'Tabs',
      component: TabLayout,
      options: { headerShown: false },
    },
    {
      name: 'Profile',
      component: Profile,
      options: {
        headerShown: true,
        headerStyle: headerBaseStyle(50),
        headerTintColor: themeColors.black as string,
      },
    },
    {
      name: 'Chat',
      component: Chat,
      options: {
        headerShown: true,
        headerStyle: headerBaseStyle(50),
        headerTintColor: themeColors.black as string,
      },
    },
    {
      name: 'ShopManage',
      component: ShopManage,
      options: { headerShown: false },
    },
    {
      name: 'Privacy',
      component: Privacy,
      options: { headerShown: false },
    },
    {
      name: 'About',
      component: About,
      options: { headerShown: false },
    },
    {
      name: 'Booking',
      component: Booking,
      options: {
        headerTitle: 'My Bookings',
        headerShown: true,
        headerStyle: headerBaseStyle(60),
        headerTintColor: themeColors.black as string,
      },
    },
    {
      name: 'changePassword',
      component: ChangePassword,
      options: {
        headerShown: true,
        headerStyle: headerBaseStyle(50),
        headerTintColor: themeColors.black as string,
      },
    },
  ], [themeColors]);

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{ drawerType: 'back' }}
      initialRouteName="Tabs"
    >
      {screens.map((screen) => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Drawer.Navigator>
  );
};


// Custom Drawer Content Component
function DrawerContent(props: DrawerContentComponentProps) {
  const { themeColors, role } = useGlobalContext();
  const logout = async () => {
    await Promise.all([
      AsyncStorage.removeItem('token'),
      AsyncStorage.removeItem('role'),
    ])
    props.navigation.navigate('SignIn');
  }
  const baseStyle = {
    backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
    marginBottom: 10,
  };
  const labelStyle = { color: themeColors.black as string };

  const menuItems = useMemo(() => {
    return [
      { label: 'Chat', screen: 'Chat' },
      { label: 'Booking', screen: 'Booking' },
      role ? { label: 'Profile', screen: 'Profile' } : null,
      role === 'VENDOR' ? { label: 'Manage Shop', screen: 'ShopManage' } : null,
      !role ? { label: 'Sign in', screen: 'SignIn', isStack: true } : null,
      !role ? { label: 'Sign up', screen: 'SignUp', isStack: true } : null,
      role ? { label: 'Change Password', screen: 'changePassword' } : null,
      { label: 'Privacy', screen: 'Privacy' },
      { label: 'About', screen: 'About' },
      { label: 'Logout', action: () => logout() },
      { label: 'Close Drawer', action: () => props.navigation.closeDrawer() },
    ].filter(Boolean);
  }, [role, props.navigation]);

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95) }}
    >
      {role && <NameImage />}
      {menuItems.map((item: any, index: number) => (
        <DrawerItem
          key={index}
          style={baseStyle}
          labelStyle={labelStyle}
          label={item.label}
          onPress={() => {
            if (item.action) return item.action();
            if (item.isStack) {
              props.navigation.navigate('Tabs', {
                screen: 'Stacks',
                params: { screen: item.screen },
              });
            } else {
              props.navigation.navigate(item.screen as string);
            }
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}

export default DrawerLayout;
