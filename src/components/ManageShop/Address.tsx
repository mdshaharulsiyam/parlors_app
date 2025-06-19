import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import SingleSelectDropDown from '../../screens/drawer/SingleSelectDropDown';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { IAddressInput, IAddressInputError, IAddressInputLabel, SelectTypes } from '../../utils/types/Types';
import GradientButton from '../Shared/GradientButton';

const district: SelectTypes[] = [
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
];
const sub_district: SelectTypes[] = [
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
];
const union: SelectTypes[] = [
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
];
const post: SelectTypes[] = [
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
];
const Address = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { themeColors } = useGlobalContext()
  const [inputValue, setInputValue] = useState<IAddressInput>({
    district: '',
    sub_district: '',
    union: '',
    post: '',
    street_address: '',
  });
  const [error, setError] = useState<IAddressInputError>({
    district: false,
    sub_district: false,
    union: false,
    post: false,
    street_address: false,
  })
  const [inputLabel, setInputLabel] = useState<IAddressInputLabel>({
    district: 'Zila',
    sub_district: 'Upzila',
    union: 'Union',
    post: 'Post office',
    street_address: 'Street Address',
  })
  const submitHandler = () => {
    let isInvalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof IAddressInput] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        isInvalid = true;
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (isInvalid) {
      Toast.show({
        type: 'error',
        text1: 'failed to login',
        text2: 'Please fill all fields',
      });
    }
  }
  return (
    <View>
      {Object.keys(inputValue).map((key, index, arr) => {
        if (key !== 'street_address') {
          return (
            <View key={key}>
              <Text style={[globalStyles.inputLabel, {
                color: hexToRGBA(themeColors.black as string, 0.8),
              }]}>{inputLabel[key as keyof IAddressInputLabel]}</Text>
              <SingleSelectDropDown
                name={key}
                data={key === 'district' ? district : key === 'sub_district' ? sub_district : key === 'union' ? union : post}
                value={inputValue[key as keyof IAddressInput]}
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
              {inputLabel[key as keyof IAddressInputLabel]}
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                value={inputValue[key as keyof IAddressInput]}
                onChangeText={text => {
                  setInputValue({ ...inputValue, [key]: text });
                  setError({ ...error, [key]: false });
                }}
                placeholder={`Enter your ${inputLabel[key as keyof IAddressInputLabel]}`}
                placeholderTextColor={hexToRGBA(themeColors.black as string, 0.4)}
                style={[
                  globalStyles.input,
                  {
                    borderColor: error[key as keyof IAddressInputError]
                      ? themeColors.red as string
                      : hexToRGBA(themeColors.black as string, 0.4),
                    borderWidth: error[key as keyof IAddressInputError] ? 1 : 0,
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
        {isUpdating ? (
          <ActivityIndicator size="small" color={themeColors.white as string} />
        ) : (
          <Text
            style={[
              {
                color: themeColors.white as string,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '600',
              },
            ]}>
            Update
          </Text>
        )}
      </GradientButton>
    </View>
  )
}

export default Address


const styles = StyleSheet.create({
  selectContainer: {
    marginBottom: 8,
  },
  selectHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});
