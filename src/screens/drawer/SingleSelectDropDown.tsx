import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { globalStyles } from '../../constant/styles';
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
  return (
    <Dropdown
      style={[
        globalStyles.input,
        error[name as any] ? globalStyles.inputError : {},
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
      placeholderStyle={{ color: globalStyles.inputPlaceholder.color }}
      selectedTextStyle={{ color: '#000' }}
      containerStyle={{ borderRadius: 5 }}
      dropdownPosition="auto"
    />
  );
};

export default SingleSelectDropDown;

const styles = StyleSheet.create({});
