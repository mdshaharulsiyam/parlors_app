import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import Address from '../../components/ManageShop/Address';
import AvailableTme from '../../components/ManageShop/AvailableTme';
import Profile from '../../components/ManageShop/Profile';
import Workers from '../../components/ManageShop/Workers';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { commonStyles } from '../../utils/styles/Styles';

const tabs = ['profile', 'address', 'workers', 'available time']
const ShopManage = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { themeColors } = useGlobalContext();
  const components = {
    "profile": <Profile />,
    "address": <Address />,
    "workers": <Workers />,
    "available time": <AvailableTme />,
  }
  return (
    <SafeAreaView
      style={{
        backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
      }}
    >
      <FlatList
        ListHeaderComponent={() => (
          <View style={{
            marginBottom: 15
          }}>
            <Text
              style={{
                color: themeColors.black as string,
                fontWeight: '600',
                fontSize: 20,
                textTransform: 'capitalize',
                marginTop: 5,
                marginBottom: 10,
              }}>
              Manage Shop {currentTab}
            </Text>
            <FlatList
              data={tabs}
              horizontal
              contentContainerStyle={{
                gap: 5,
                marginVertical: 8,
              }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setCurrentTab(item)}
                  activeOpacity={0.7}
                  style={[
                    commonStyles.Button,
                    {
                      backgroundColor:
                        item == currentTab
                          ? themeColors.primary as string
                          : themeColors.yellow as string,
                      borderRadius: 3,
                    }]}
                  key={item}>
                  <Text
                    style={{
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      color: themeColors.black as string,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />

          </View>
        )}
        contentContainerStyle={{
          padding: 5,
        }}
        data={[components[currentTab as keyof typeof components]]}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          item
        )}
      />
    </SafeAreaView>

  );
};

export default ShopManage;
