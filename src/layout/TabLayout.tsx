import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {PlatformPressable, Text} from '@react-navigation/elements';
import {
  useLinkBuilder,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {tabIcons} from '../constant/images';
import {useGlobalContext} from '../Provider/GlobalContextProvider';
import Booking from '../screens/drawer/Booking';
import Home from '../screens/tab/Home';
import Parlors from '../screens/tab/Parlors';
import Workspace from '../screens/tab/Workspace';
import {hexToRGBA} from '../utils/hexToRGBA';
import {commonStyles} from '../utils/styles/Styles';
import {ScreenParamsType} from '../utils/types/ScreenParamsType';
import StackLayout from './StackLayout';

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  return (
    <Tab.Navigator
      id={undefined}
      tabBar={props => (
        <TabBarContent
          {...props}
          position={props.navigation.getState().index}
        />
      )}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Parlors"
        component={Parlors}
        options={{headerShown: false, tabBarLabel: 'Services'}}
      />
      <Tab.Screen
        name="Bookings"
        component={Booking}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Workspace"
        component={Workspace}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Stacks"
        component={StackLayout}
        options={{headerShown: false, tabBarLabel: 'More'}}
      />
    </Tab.Navigator>
  );
};

//  tab bar design

interface TabBarContentProps extends BottomTabBarProps {
  position?: any;
}

const TabBarContent = ({
  state,
  descriptors,
  navigation,
  position,
}: TabBarContentProps) => {
  const navigate = useNavigation<DrawerNavigationProp<ScreenParamsType>>();
  const {themeColors} = useGlobalContext();
  const {colors} = useTheme();
  const {buildHref} = useLinkBuilder();

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: themeColors.white as string,
          borderTopColor: hexToRGBA(themeColors.black as string, 0.1),
        },
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        if (route.name === 'Stacks') {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigate.openDrawer()}
              style={styles.tabButton}>
              <View
                style={[
                  commonStyles.flex1_center,
                  styles.tabContent,
                  isFocused && {
                    backgroundColor: themeColors.secondary as string,
                  },
                ]}>
                <Image
                  source={tabIcons.Menu as ImageSourcePropType}
                  style={[
                    styles.tabIcon,
                    {
                      tintColor: isFocused
                        ? (themeColors.primary as string)
                        : (themeColors.black as string),
                    },
                  ]}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabLabel,
                    {
                      fontWeight: isFocused ? '700' : '400',
                      color: isFocused
                        ? (themeColors.primary as string)
                        : (themeColors.black as string),
                    },
                  ]}>
                  More
                </Text>
              </View>
            </TouchableOpacity>
          );
        }
        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}>
            <View
              style={[
                commonStyles.flex1_center,
                styles.tabContent,
                isFocused && {
                  backgroundColor: themeColors.secondary as string,
                },
              ]}>
              <Image
                source={
                  tabIcons[
                    route.name as keyof typeof tabIcons
                  ] as ImageSourcePropType
                }
                style={[
                  styles.tabIcon,
                  {
                    tintColor: isFocused
                      ? (themeColors.primary as string)
                      : (themeColors.black as string),
                  },
                ]}
              />
              <Text
                numberOfLines={1}
                style={[
                  styles.tabLabel,
                  {
                    fontWeight: isFocused ? '700' : '400',
                    color: isFocused
                      ? (themeColors.primary as string)
                      : (themeColors.black as string),
                  },
                ]}>
                {typeof label === 'string'
                  ? label
                  : label({
                      focused: isFocused,
                      color: colors.text,
                      position,
                      children: route.name,
                    })}
              </Text>
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 68,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 6,
    borderTopWidth: 1,
  },
  tabButton: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 2,
  },
  tabContent: {
    minHeight: 52,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  tabIcon: {
    height: 20,
    width: 20,
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
});
