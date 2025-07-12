import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import ServicesCreateUpdateForm from '../../components/ManageShop/ServicesCreateUpdateForm';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';

const ServiceAddEdit = () => {
  const {themeColors} = useGlobalContext();
  return (
    <SafeAreaView
      style={{
        backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
        padding: 15,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ServicesCreateUpdateForm />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceAddEdit;

const styles = StyleSheet.create({});
