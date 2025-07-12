import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OtherIcons} from '../../constant/images';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import SingleSelectDropDown from '../../screens/drawer/SingleSelectDropDown';
import {IAddressInput, IAddressInputError} from '../../utils/types/Types';
import GradientButton from './GradientButton';
import SearchInput from './SearchInput';

const FilterOptions = () => {
  const {themeColors, search, setSearch, bottomSheetRef} = useGlobalContext();
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
  const handleSearch = (value: string) => console.log(value);
  const handleSubmit = () => {
    console.log(search);
    bottomSheetRef.current?.close();
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
          <Text style={{color: themeColors.black as string}}>
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
      {Object.entries(inputValue).map(([key, value]) => (
        <View key={key} style={styles.selectContainer}>
          <Text style={styles.selectHeading}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Text>
          <SingleSelectDropDown
            name={key}
            data={[{label: 'Dhaka', value: 'Dhaka'}]}
            value={value}
            inputValue={value}
            setInputValue={setInputValue}
            setError={setError}
            error={error}
          />
        </View>
      ))}
      <View style={{marginTop: 10, marginBottom: 160}}>
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
