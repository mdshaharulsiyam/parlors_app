import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { useAddressApiCall } from '../../ApisCalls/addressApiCall';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { setAddress, setIndex } from '../../Redux/States/vendorSlice';
import SingleSelectDropDown from '../../screens/drawer/SingleSelectDropDown';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { IAddressInput, IAddressInputError, IAddressInputLabel } from '../../utils/types/Types';
import GradientButton from '../Shared/GradientButton';

const Address = ({ creating = false }: { creating?: boolean }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { themeColors } = useGlobalContext()
  const dispatch = useDispatch()
  const [divisionSearch, setDivisionSearch] = useState('')
  const [districtSearch, setDistrictSearch] = useState('')
  const [upazillaSearch, setUpazillaSearch] = useState('')
  const [unionSearch, setUnionSearch] = useState('')
  const [inputValue, setInputValue] = useState<IAddressInput>({
    divisions: '',
    districts: '',
    upazilas: '',
    unions: '',
    street_address: '',
  });

  const [error, setError] = useState<IAddressInputError>({
    divisions: false,
    districts: false,
    upazilas: false,
    unions: false,
    street_address: false,
  })

  const [inputLabel, setInputLabel] = useState<IAddressInputLabel>({
    divisions: 'Division',
    districts: 'District',
    upazilas: 'Upazila',
    unions: 'Union',
    street_address: 'Street Address',
  })

  const { divisions, districts, upazilas, unions } = useAddressApiCall({
    division_id: inputValue.divisions,
    district_id: inputValue.districts,
    upazilla_id: inputValue.upazilas,
    unionSearch,
    districtSearch,
    upazillaSearch,
    divisionSearch,
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
        text1: 'Address is required',
        text2: 'Please fill all fields',
      });
      return
    }
    if (creating) {
      dispatch(setAddress(inputValue))
      dispatch(setIndex(2))
    } else {

    }
  }
  const handleReset = (key: keyof IAddressInput, value?: string) => {
    console.log(key)
    if (key === 'divisions') {
      setInputValue({
        "divisions": value as string,
        "districts": "",
        "upazilas": "",
        "unions": "",
        "street_address": inputValue?.street_address,
      })
    }
    if (key === 'districts') {
      setInputValue({
        "divisions": inputValue?.divisions,
        "districts": value as string,
        "upazilas": "",
        "unions": "",
        "street_address": inputValue?.street_address,
      })
    }
    if (key === 'upazilas') {
      setInputValue({
        "divisions": inputValue?.divisions,
        "districts": inputValue?.districts,
        "upazilas": value as string,
        "unions": "",
        "street_address": inputValue?.street_address,
      })
    }
    if (key === 'unions') {
      setInputValue({
        "divisions": inputValue?.divisions,
        "districts": inputValue?.districts,
        "upazilas": inputValue?.upazilas,
        "unions": value as string,
        "street_address": inputValue?.street_address,
      })
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
                data={key === 'divisions' ? divisions : key === 'districts' ? districts : key === 'upazilas' ? upazilas : unions}
                value={inputValue[key as keyof IAddressInput]}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setError={setError}
                error={error}
                onChangeText={key === 'divisions' ? setDivisionSearch : key === 'districts' ? setDistrictSearch : key === 'upazilas' ? setUpazillaSearch : setUnionSearch}
                resetHandler={(value) => handleReset(key as keyof IAddressInput, value)}
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
            Save
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
