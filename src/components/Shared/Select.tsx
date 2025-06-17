import React, { useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';

interface SelectProps {
  isMultiSelect?: boolean;
  data?: { label: string; value: string }[];
  selectedValue?: any;
  setSelectedValue?: (value: any) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  renderItem?: (item: any) => React.JSX.Element;
  renderSelectedItem?: (
    item: any,
    unSelect?: (item: any) => void,
  ) => React.JSX.Element;
  themeColors?: {
    background2: string;
    text: string;
    icon: string;
    red: string;
  };
  categoryOptions?: { label: string; value: string }[];
  searchText?: string;
  setSearchText?: (text: string) => void;
  borderColor?: string;
  height?: any;
  width?: any;
  borderWidth?: number;
  validate?: boolean;
  errorMessage?: string;
}

const Select: React.FC<SelectProps> = ({
  isMultiSelect = false,
  data = [{ label: 'Select', value: '' }],
  selectedValue = '',
  setSelectedValue = () => { },

  placeholder = 'Select',
  searchPlaceholder = 'Search...',
  renderItem = (item: any) => <Text style={{
    padding: 5,

  }}>{item.label}</Text>,
  renderSelectedItem = (item: any, unSelect?: (item: any) => void) => (
    <TouchableOpacity style={{
      padding: 8,
      marginVertical: 5
    }} onPress={() => unSelect?.(item)}>
      <View style={styles.selectedStyle}>
        <Text style={styles.textSelectedStyle}>{item.label}</Text>
        <Text style={{ color: 'red' }}> - </Text>
      </View>
    </TouchableOpacity>
  ),

  categoryOptions = [],
  searchText = '',
  setSearchText = () => { },
  borderColor = 'gray',
  height = 40,
  width = '100%',
  borderWidth = 1,
  validate = false,
  errorMessage = 'This field is required',
}) => {
  const { themeColors } = useGlobalContext();
  const [animation] = useState(new Animated.Value(0));
  const [isTouched, setIsTouched] = useState(false);

  const handleSelectChange = (item: any) => {
    setSelectedValue(item);
    if (validate) {
      setIsTouched(true);
    }
  };

  const borderColorDynamic =
    isTouched && validate && !selectedValue ? 'red' : borderColor;

  return (
    <View style={styles.container}>
      {isMultiSelect ? (
        <MultiSelect
          style={[
            styles.dropdown,
            {
              backgroundColor: themeColors.white as string,
              borderColor: borderColorDynamic,
              borderWidth,
              height,
              width,
            },
          ]}
          placeholderStyle={[
            styles.placeholderStyle,
            { color: themeColors.black as string },
          ]}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          renderInputSearch={() => (
            <View
              style={[
                styles.searchContainer,
                {
                  backgroundColor: themeColors.white as string,
                  borderWidth: 0.3,
                  borderColor: themeColors.black as string,
                },
              ]}>
              <TextInput
                style={[styles.searchInput, { color: themeColors.black as string }]}
                placeholder={searchPlaceholder}
                placeholderTextColor={themeColors.black as string}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          )}
          data={categoryOptions.filter(item =>
            item.label.toLowerCase().includes(searchText.toLowerCase()),
          )}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          containerStyle={{
            backgroundColor: themeColors.white as string,
            borderWidth: 0,
            width: '100%',
          }}
          activeColor={hexToRGBA(themeColors.green as string, 0.1)}
          value={selectedValue}
          search
          searchPlaceholder={searchPlaceholder}
          onChange={handleSelectChange}
          renderItem={renderItem}
          renderSelectedItem={renderSelectedItem}
        />
      ) : (
        <Dropdown
          style={[
            styles.dropdown,
            {
              backgroundColor: themeColors.white as string,
              borderColor: borderColorDynamic as string,
              borderWidth,
              height,
              width,
            },
          ]}
          placeholderStyle={[
            styles.placeholderStyle,
            { color: themeColors.black as string },
          ]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            { color: themeColors.black as string },
          ]}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          containerStyle={{
            backgroundColor: themeColors.white as string,
            borderWidth: 0,
            // width: '100%',
          }}
          activeColor={hexToRGBA(themeColors.green as string, 0.1)}
          value={selectedValue}
          onChange={handleSelectChange}
          renderItem={renderItem}
        />
      )}

      {/* Validation error message */}
      {isTouched && validate && !selectedValue && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: 5 }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%', // Full width
  },
  dropdown: {
    padding: 10,
    borderRadius: 5,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    padding: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    marginLeft: 10,
  },
  icon: {
    paddingRight: 10,
  },
  selectedStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginVertical: 8
  },
  textSelectedStyle: {
    fontSize: 14,
    marginRight: 5,
  },
});
