import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { ISingleDropDownProps } from '../../utils/types/PropsTypes';


const SingleSelectDropDown = ({
  error,
  data,
  name,
  value,
  inputValue,
  setInputValue,
  setError,
  placeholder,
  handler,
}: ISingleDropDownProps) => {
  const { themeColors } = useGlobalContext()
  return (
    <Dropdown
      style={[
        globalStyles.input,
        {
          borderColor: error[name] ? themeColors.red as string : themeColors.black as string,
          backgroundColor: hexToRGBA(themeColors.black as string, 0.2),
          borderWidth: error[name] ? 1 : 0,
        }
      ]}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder || 'Select Gender'}
      value={value}
      onChange={item => {
        handler
          ? handler(item.value)
          : setInputValue({ ...inputValue, [name]: item.value });
        setError({ ...error, [name]: false });
      }}
      itemTextStyle={{ color: themeColors.black as string }}
      itemContainerStyle={{ backgroundColor: hexToRGBA(themeColors.white as string, 0.95), borderWidth: 0, }}
      placeholderStyle={{ color: hexToRGBA(themeColors.black as string, 0.5) }}
      selectedTextStyle={{ color: themeColors.black as string }}
      containerStyle={{
        borderRadius: 5,
        backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
        overflow: 'hidden',
      }}
      dropdownPosition="auto"
      renderItem={(item: any) => {
        const isSelected = item.value === value;
        return (
          <View
            style={{
              backgroundColor: isSelected
                ? hexToRGBA(themeColors.white as string, 0.95)
                : hexToRGBA(themeColors.white as string, 0.6),
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <Text style={{ color: themeColors.black as string }}>{item.label}</Text>
          </View>
        );
      }}
    />

  );
};

export default SingleSelectDropDown;

const styles = StyleSheet.create({});
