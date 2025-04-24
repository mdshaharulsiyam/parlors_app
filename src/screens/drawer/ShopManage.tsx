import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import Address from '../../components/ManageShop/Address';
import AvailableTme from '../../components/ManageShop/AvailableTme';
import Profile from '../../components/ManageShop/Profile';
import Workers from '../../components/ManageShop/Workers';
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
    <FlatList
      ListHeaderComponent={() => (
        <View style={{
          marginBottom: 15
        }}>
          <Text
            style={{
              color: themeColors.text,
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
                        ? themeColors.icon
                        : themeColors.icon2,
                    borderRadius: 3,
                    borderColor: themeColors.icon,
                    borderWidth: 0.5,
                  }]}
                key={item}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    color: item == currentTab ? themeColors.white : themeColors.icon,
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

  );
};

export default ShopManage;
