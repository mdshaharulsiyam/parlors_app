import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { PlatformPressable, Text } from '@react-navigation/elements';
import {
  useLinkBuilder,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import Parlors from '../components/Home/Parlors';
import { tabIcons } from '../constant/images';
import { useGlobalContext } from '../Provider/GlobalContextProvider';
import Home from '../screens/tab/Home';
import { commonStyles } from '../utils/styles/Styles';
import { ScreenParamsType } from '../utils/types/ScreenParamsType';
import StackLayout from './StackLayout';
const Tab = createBottomTabNavigator();

const TabLayout = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <TabBarContent
          {...props}
          position={props.navigation.getState().index}
        />
      )}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen
        name="Parlors"
        component={Parlors}
        options={{ headerShown: false, tabBarLabel: 'Vendors' }}
      />
      <Tab.Screen
        name="Stacks"
        component={StackLayout}
        options={{ headerShown: false }}
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
  const { themeColors } = useGlobalContext();
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ flexDirection: 'row', height: 'auto', width: '100%', backgroundColor: themeColors.white as string }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
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
              style={{ flex: 1, padding: 5, height: 45 }}>
              <View style={[commonStyles.flex1_center]}>
                <Image
                  source={tabIcons.Menu as ImageSourcePropType}
                  style={{
                    height: 20,
                    width: 20,
                    marginBottom: 2,
                    tintColor: isFocused ? themeColors.primary as string : themeColors.black as string,
                  }}
                />
                <Text
                  style={{
                    fontWeight: isFocused ? '700' : '400',
                    color: isFocused ? themeColors.primary as string : themeColors.black as string,
                  }}>
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
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, padding: 5, height: 45 }}>
            <View style={[commonStyles.flex1_center,]}>
              <Image
                source={
                  tabIcons[
                  route.name as keyof typeof tabIcons
                  ] as ImageSourcePropType
                }
                style={{
                  height: 20,
                  width: 20,
                  marginBottom: 2,
                  tintColor: isFocused ? themeColors.primary as string : themeColors.black as string,
                }}
              />
              <Text
                style={{
                  fontWeight: isFocused ? '700' : '400',
                  color: isFocused ? themeColors.primary as string : themeColors.black as string,
                }}>
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
