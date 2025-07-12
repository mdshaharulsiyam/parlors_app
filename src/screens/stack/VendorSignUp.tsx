import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import Address from '../../components/ManageShop/Address';
import AvailableTime from '../../components/ManageShop/AvailableTme';
import Profile from '../../components/ManageShop/Profile';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';

const VendorSignUp = () => {
  const {themeColors} = useGlobalContext();
  const {index, profile} = useSelector((state: any) => state?.vendor);
  const components = [
    <Profile creating={true} />,
    <Address creating={true} />,
    <AvailableTime creating={true} />,
  ];
  return (
    <SafeAreaView
      style={{backgroundColor: hexToRGBA(themeColors.white as string, 0.95)}}>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 15,
          zIndex: 1,
        }}>
        {components[index]}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VendorSignUp;

const styles = StyleSheet.create({});
