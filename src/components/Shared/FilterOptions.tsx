import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAddressApiCall } from '../../ApisCalls/addressApiCall';
import { OtherIcons } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import SingleSelectDropDown from '../../screens/drawer/SingleSelectDropDown';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { IAddressInput, IAddressInputError, IAddressInputLabel } from '../../utils/types/Types';
import GradientButton from './GradientButton';
import SearchInput from './SearchInput';

const FilterOptions = () => {
  const { themeColors, search, setSearch, bottomSheetRef } = useGlobalContext();
  const [divisionSearch, setDivisionSearch] = useState('');
  const [districtSearch, setDistrictSearch] = useState('');
  const [upazillaSearch, setUpazillaSearch] = useState('');
  const [unionSearch, setUnionSearch] = useState('');
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
  });

  const [inputLabel, setInputLabel] = useState<IAddressInputLabel>({
    divisions: 'Division',
    districts: 'District',
    upazilas: 'Upazila',
    unions: 'Union',
    street_address: 'Street Address',
  });
  const { divisions, districts, upazilas, unions } = useAddressApiCall({
    division_id: inputValue.divisions,
    district_id: inputValue.districts,
    upazilla_id: inputValue.upazilas,
    unionSearch,
    districtSearch,
    upazillaSearch,
    divisionSearch,
  });
  const handleSearch = (value: string) => console.log(value);
  const handleSubmit = () => {
    console.log(search);
    bottomSheetRef.current?.close();
  };
  const handleReset = (key: keyof IAddressInput, value?: string) => {
    if (key === 'divisions') {
      setInputValue({
        divisions: value as string,
        districts: '',
        upazilas: '',
        unions: '',
        street_address: inputValue?.street_address,
      });
    }
    if (key === 'districts') {
      setInputValue({
        divisions: inputValue?.divisions,
        districts: value as string,
        upazilas: '',
        unions: '',
        street_address: inputValue?.street_address,
      });
    }
    if (key === 'upazilas') {
      setInputValue({
        divisions: inputValue?.divisions,
        districts: inputValue?.districts,
        upazilas: value as string,
        unions: '',
        street_address: inputValue?.street_address,
      });
    }
    if (key === 'unions') {
      setInputValue({
        divisions: inputValue?.divisions,
        districts: inputValue?.districts,
        upazilas: inputValue?.upazilas,
        unions: value as string,
        street_address: inputValue?.street_address,
      });
    }
  };
  return (
    <ScrollView
      style={{
        padding: 8,
        backgroundColor: themeColors.white as string,
      }}>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            marginBottom: 10,
            color: themeColors.black as string,
          }}>
          Filter by
        </Text>
        <TouchableOpacity onPress={() => bottomSheetRef?.current?.close()}>
          <Text style={{ color: themeColors.black as string }}>
            <Image
              source={OtherIcons.Cross as ImageSourcePropType}
              style={{
                height: 30,
                width: 30,
                tintColor: themeColors.black as string,
              }}
            />
          </Text>
        </TouchableOpacity>
      </View>

      <SearchInput inputWidth="100%" />
      {Object.keys(inputValue).map((key, index, arr) => {
        if (key !== 'street_address') {
          return (
            <View key={key}>
              <Text
                style={[
                  globalStyles.inputLabel,
                  {
                    color: hexToRGBA(themeColors.black as string, 0.8),
                  },
                ]}>
                {inputLabel[key as keyof IAddressInputLabel]}
              </Text>
              <SingleSelectDropDown
                name={key}
                data={
                  key === 'divisions'
                    ? divisions
                    : key === 'districts'
                      ? districts
                      : key === 'upazilas'
                        ? upazilas
                        : unions
                }
                value={inputValue[key as keyof IAddressInput]}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setError={setError}
                error={error}
                onChangeText={
                  key === 'divisions'
                    ? setDivisionSearch
                    : key === 'districts'
                      ? setDistrictSearch
                      : key === 'upazilas'
                        ? setUpazillaSearch
                        : setUnionSearch
                }
                resetHandler={value =>
                  handleReset(key as keyof IAddressInput, value)
                }
              />
            </View>
          );
        }
        return (
          <View key={key} style={{}}>
            <Text
              style={[
                globalStyles.inputLabel,
                {
                  color: hexToRGBA(themeColors.black as string, 0.8),
                },
              ]}>
              {inputLabel[key as keyof IAddressInputLabel]}
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                value={inputValue[key as keyof IAddressInput]}
                onChangeText={text => {
                  setInputValue({ ...inputValue, [key]: text });
                  setError({ ...error, [key]: false });
                }}
                placeholder={`Enter your ${inputLabel[key as keyof IAddressInputLabel]
                  }`}
                placeholderTextColor={hexToRGBA(
                  themeColors.black as string,
                  0.4,
                )}
                style={[
                  globalStyles.input,
                  {
                    borderColor: error[key as keyof IAddressInputError]
                      ? (themeColors.red as string)
                      : hexToRGBA(themeColors.black as string, 0.4),
                    borderWidth: error[key as keyof IAddressInputError] ? 1 : 0,
                    backgroundColor: hexToRGBA(
                      themeColors.black as string,
                      0.2,
                    ),
                    color: themeColors.black as string,
                  },
                ]}
              />
            </View>
          </View>
        );
      })}
      <View style={{ marginTop: 10, marginBottom: 160 }}>
        <GradientButton handler={handleSubmit}>
          {false ? (
            <ActivityIndicator
              size="small"
              color={themeColors.constWhite as string}
            />
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
              Filter
            </Text>
          )}
        </GradientButton>
      </View>
    </ScrollView>
  );
};

export default FilterOptions;

const styles = StyleSheet.create({
  selectContainer: {
    marginBottom: 8,
  },
  selectHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});
