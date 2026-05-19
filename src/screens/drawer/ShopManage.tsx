import React, {useState} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import Address from '../../components/ManageShop/Address';
import AvailableTme from '../../components/ManageShop/AvailableTme';
import Profile from '../../components/ManageShop/Profile';
import Services from '../../components/ManageShop/Services';
import Workers from '../../components/ManageShop/Workers';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {commonStyles} from '../../utils/styles/Styles';

const tabs = ['profile', 'address', 'workers', 'available time', 'services'];
const ShopManage = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const {themeColors, height} = useGlobalContext();
  const components = {
    profile: <Profile />,
    address: <Address />,
    workers: <Workers />,
    'available time': <AvailableTme />,
    services: <Services />,
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
        height,
      }}>
      <FlatList
        ListHeaderComponent={() => (
          <View
            style={{
              marginBottom: 15,
            }}>
            <View
              style={{
                marginTop: 10,
                marginBottom: 6,
              }}>
              <Text
                style={{
                  color: themeColors.black as string,
                  fontWeight: '800',
                  fontSize: 20,
                  textTransform: 'capitalize',
                }}>
                {currentTab}
              </Text>
            </View>
            <FlatList
              data={tabs}
              horizontal
              contentContainerStyle={{
                gap: 5,
                marginVertical: 8,
              }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => setCurrentTab(item)}
                  activeOpacity={0.7}
                  style={[
                    commonStyles.Button,
                    {
                      backgroundColor:
                        item === currentTab
                          ? (themeColors.primary as string)
                          : hexToRGBA(themeColors.black as string, 0.06),
                      borderRadius: 8,
                      borderColor:
                        item === currentTab
                          ? (themeColors.primary as string)
                          : hexToRGBA(themeColors.black as string, 0.08),
                    },
                  ]}
                  key={item}>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      color:
                        item === currentTab
                          ? (themeColors.constWhite as string)
                          : (themeColors.black as string),
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        data={[components[currentTab as keyof typeof components]]}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item}) => item}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ShopManage;
