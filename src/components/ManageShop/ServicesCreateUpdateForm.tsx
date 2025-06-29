import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import SingleSelectDropDown from '../../screens/drawer/SingleSelectDropDown';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { IServicesInput, IServicesInputError, IServicesInputLabel } from '../../utils/types/Types';
import GradientButton from '../Shared/GradientButton';


const ServicesCreateUpdateForm = () => {
  const { themeColors } = useGlobalContext()
  const [inputValue, setInputValue] = useState<IServicesInput>({
    name: '',
    price: '',
    description: '',
    img: '',
    category: '',
    sub_category: '',
  });
  const [error, setError] = useState<IServicesInputError>({
    name: false,
    price: false,
    description: false,
    img: false,
    category: false,
    sub_category: false,
  })
  const [inputLabel, setInputLabel] = useState<IServicesInputLabel>({
    name: 'Name',
    price: 'Price',
    description: 'Description',
    img: 'Image',
    category: 'Category',
    sub_category: 'Sub Category',
  })
  const submitHandler = () => {
    let isInvalid = false;

    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof IServicesInput] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        isInvalid = true;
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });

    if (isInvalid) {
      Toast.show({
        type: 'error',
        text1: 'Address is required',
        text2: 'Please fill all fields',
      });
      return
    }
  }
  return (
    <View>
      {Object.keys(inputValue).map((key, index, arr) => {
        if (key == 'Category' || key == 'Sub Category') {
          return (
            <View key={key}>
              <Text style={[globalStyles.inputLabel, {
                color: hexToRGBA(themeColors.black as string, 0.8),
              }]}>{inputLabel[key as keyof IServicesInputLabel]}</Text>
              <SingleSelectDropDown
                name={key}
                data={key === 'Category' ? [{
                  label: 'Category',
                  value: 'category',
                }] : [{
                  label: 'Sub Category',
                  value: 'sub_category',
                }]}
                value={inputValue[key as keyof IServicesInput]}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setError={setError}
                error={error}
              />
            </View>
          );
        }
        return (
          <View key={key} style={{}}>
            <Text style={[globalStyles.inputLabel, {
              color: hexToRGBA(themeColors.black as string, 0.8),
            }]}>
              {inputLabel[key as keyof IServicesInputLabel]}
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                value={inputValue[key as keyof IServicesInput]}
                onChangeText={text => {
                  setInputValue({ ...inputValue, [key]: text });
                  setError({ ...error, [key]: false });
                }}
                placeholder={`Enter your ${inputLabel[key as keyof IServicesInputLabel]}`}
                placeholderTextColor={hexToRGBA(themeColors.black as string, 0.4)}
                style={[
                  globalStyles.input,
                  {
                    borderColor: error[key as keyof IServicesInputError]
                      ? themeColors.red as string
                      : hexToRGBA(themeColors.black as string, 0.4),
                    borderWidth: error[key as keyof IServicesInputError] ? 1 : 0,
                    backgroundColor: hexToRGBA(themeColors.black as string, 0.2),
                    color: themeColors.black as string,
                  }
                ]}
              />
            </View>
          </View>
        );
      })}
      <GradientButton handler={submitHandler}>
        {false ? (
          <ActivityIndicator size="small" color={themeColors.constWhite as string} />
        ) : (
          <Text
            style={[
              {
                color: themeColors.constWhite as string,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '600',
              },
            ]}>
            Save
          </Text>
        )}
      </GradientButton>
    </View>
  )
}


export default ServicesCreateUpdateForm

const styles = StyleSheet.create({})