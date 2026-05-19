import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NameImage from '../components/Shared/NameImage';
import {tabIcons} from '../constant/images';
import {useGlobalContext} from '../Provider/GlobalContextProvider';
import {setRole, setToken} from '../Redux/States/userSlice';
import About from '../screens/drawer/About';
import Booking from '../screens/drawer/Booking';
import ChangePassword from '../screens/drawer/ChangePassword';
import Chat from '../screens/drawer/Chat';
import Privacy from '../screens/drawer/Privacy';
import Profile from '../screens/drawer/Profile';
import ShopManage from '../screens/drawer/ShopManage';
import VendorSignUp from '../screens/stack/VendorSignUp';
import {hexToRGBA} from '../utils/hexToRGBA';
import TabLayout from './TabLayout';

const Drawer = createDrawerNavigator();

const DrawerLayout = () => {
  const {themeColors} = useGlobalContext();
  const headerBaseStyle = useMemo(
    () => ({
      backgroundColor: themeColors.white as string,
      borderBottomColor: hexToRGBA(themeColors.black as string, 0.1),
      borderBottomWidth: 1,
      shadowColor: 'transparent',
      elevation: 0,
    }),
    [themeColors],
  );

  const screens = useMemo(
    () => [
      {
        name: 'Tabs',
        component: TabLayout,
        options: {headerShown: false},
      },
      {
        name: 'Profile',
        component: Profile,
        options: {title: 'Profile'},
      },
      {
        name: 'Chat',
        component: Chat,
        options: {title: 'Chat'},
      },
      {
        name: 'ShopManage',
        component: ShopManage,
        options: {title: 'Manage Shop'},
      },
      {
        name: 'Privacy',
        component: Privacy,
        options: {title: 'Privacy'},
      },
      {
        name: 'About',
        component: About,
        options: {title: 'About'},
      },
      {
        name: 'Booking',
        component: Booking,
        options: {title: 'My Bookings'},
      },
      {
        name: 'changePassword',
        component: ChangePassword,
        options: {title: 'Change Password'},
      },
      {
        name: 'VendorSignUp',
        component: VendorSignUp,
        options: {title: 'Vendor Sign Up'},
      },
    ],
    [],
  );

  return (
    <Drawer.Navigator
      id={undefined}
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        drawerType: 'back',
        headerShown: true,
        headerStyle: headerBaseStyle,
        headerTitleAlign: 'center',
        headerTintColor: themeColors.black as string,
        headerTitleStyle: {
          color: themeColors.black as string,
          fontSize: 18,
          fontWeight: '800',
        },
        headerLeftContainerStyle: styles.headerLeftContainer,
        headerLeft: () => (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Open drawer"
            activeOpacity={0.76}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={[
              styles.menuButton,
              {
                backgroundColor: hexToRGBA(themeColors.primary as string, 0.08),
                borderColor: hexToRGBA(themeColors.primary as string, 0.16),
              },
            ]}>
            <Image
              source={tabIcons.Menu as ImageSourcePropType}
              style={[
                styles.menuIcon,
                {tintColor: themeColors.primary as string},
              ]}
            />
          </TouchableOpacity>
        ),
      })}
      initialRouteName="Tabs">
      {screens.map(screen => (
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

function DrawerContent(props: DrawerContentComponentProps) {
  const dispatch = useDispatch();
  const {role} = useSelector((state: any) => state?.user);
  const {themeColors} = useGlobalContext();
  const logout = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem('token'),
      AsyncStorage.removeItem('role'),
    ]);
    dispatch(setToken(''));
    dispatch(setRole(''));
    props.navigation.reset({
      index: 0,
      routes: [
        {name: 'Tabs', params: {screen: 'Stacks', params: {screen: 'SignIn'}}},
      ],
    });
  }, [dispatch, props.navigation]);
  const baseStyle = {
    backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
    marginBottom: 10,
  };
  const labelStyle = {color: themeColors.black as string};

  const menuItems = useMemo(() => {
    return [
      role ? {label: 'Chat', screen: 'Chat'} : null,
      role ? {label: 'Booking', screen: 'Booking'} : null,
      role ? {label: 'Profile', screen: 'Profile'} : null,
      role && role === 'VENDOR'
        ? {label: 'Manage Shop', screen: 'ShopManage'}
        : null,
      !role ? {label: 'Sign in', screen: 'SignIn', isStack: true} : null,
      !role ? {label: 'Sign up', screen: 'SignUp', isStack: true} : null,
      role ? {label: 'Change Password', screen: 'changePassword'} : null,
      role && role !== 'VENDOR'
        ? {label: 'Vendor Sign Up', screen: 'VendorSignUp'}
        : null,
      {label: 'Privacy', screen: 'Privacy'},
      {label: 'About', screen: 'About'},
      role ? {label: 'Logout', action: () => logout()} : null,
      {label: 'Close', action: () => props.navigation.closeDrawer()},
    ].filter(Boolean);
  }, [logout, props.navigation, role]);

  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: hexToRGBA(themeColors.white as string, 0.95)}}>
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
                params: {screen: item.screen},
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

const styles = StyleSheet.create({
  headerLeftContainer: {
    paddingLeft: 12,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    width: 22,
    height: 22,
  },
});
