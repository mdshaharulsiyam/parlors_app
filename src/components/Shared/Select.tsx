import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {hexToRGBA} from '../../utils/hexToRGBA';

interface SelectProps {
  isMultiSelect?: boolean;
  data?: {label: string; value: string}[];
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
  categoryOptions?: {label: string; value: string}[];
  searchText?: string;
  setSearchText?: (text: string) => void;
}

const Select: React.FC<SelectProps> = ({
  isMultiSelect = false,
  data = [{label: 'Select', value: ''}],
  selectedValue = '',
  setSelectedValue = () => {},
  placeholder = 'Select',
  searchPlaceholder = 'Search...',
  renderItem = (item: any) => <Text>{item.label}</Text>,
  renderSelectedItem = (item: any, unSelect?: (item: any) => void) => (
    <TouchableOpacity onPress={() => unSelect?.(item)}>
      <View style={styles.selectedStyle}>
        <Text style={styles.textSelectedStyle}>{item.label}</Text>
        <Text style={{color: 'red'}}> - </Text>
      </View>
    </TouchableOpacity>
  ),
  themeColors = {
    background2: '#fff',
    text: '#000',
    icon: '#000',
    red: '#ff0000',
  },
  categoryOptions = [],
  searchText = '',
  setSearchText = () => {},
}) => {
  const [animation] = useState(new Animated.Value(0)); // Animation for the dropdown

  const handleSelectChange = (item: any) => {
    setSelectedValue(item);
  };

  // Handle dropdown visibility with animation
  const handleDropdownToggle = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleDropdownClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {isMultiSelect ? (
        <MultiSelect
          style={[styles.dropdown, {backgroundColor: themeColors.background2}]}
          placeholderStyle={[
            styles.placeholderStyle,
            {color: themeColors.text},
          ]}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          renderInputSearch={() => (
            <View
              style={[
                styles.searchContainer,
                {
                  backgroundColor: themeColors.background2,
                  borderWidth: 0.3,
                  borderColor: themeColors.text,
                },
              ]}>
              <Text>s</Text>
              <TextInput
                style={[styles.searchInput, {color: themeColors.text}]}
                placeholder={searchPlaceholder}
                placeholderTextColor={themeColors.text}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          )}
          iconStyle={styles.iconStyle}
          data={categoryOptions.filter(item =>
            item.label.toLowerCase().includes(searchText.toLowerCase()),
          )}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          containerStyle={{
            backgroundColor: themeColors.background2,
            borderWidth: 0,
            width: '100%', // Full width
          }}
          activeColor={hexToRGBA(themeColors.icon, 0.1)}
          value={selectedValue}
          search
          searchPlaceholder={searchPlaceholder}
          onChange={handleSelectChange}
          renderLeftIcon={() => (
            <Text style={[styles.icon, {color: themeColors.icon}]}>F</Text>
          )}
          renderItem={renderItem}
          renderSelectedItem={renderSelectedItem}
        />
      ) : (
        <Dropdown
          style={[
            styles.dropdown,
            {backgroundColor: themeColors.background2, width: '100%'},
          ]} // Full width
          placeholderStyle={[
            styles.placeholderStyle,
            {color: themeColors.text},
          ]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            {color: themeColors.text},
          ]}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          containerStyle={{
            backgroundColor: themeColors.background2,
            borderWidth: 0,
            width: '100%', // Full width
          }}
          activeColor={hexToRGBA(themeColors.icon, 0.1)}
          value={selectedValue}
          onChange={handleSelectChange}
          renderLeftIcon={() => (
            <Text style={[styles.icon, {color: themeColors.icon}]}>F</Text>
          )}
          renderItem={renderItem}
        />
      )}

      {/* Animated dropdown */}
      <Animated.View
        style={{
          opacity: animation,
        }}>
        <Text style={{color: themeColors.text}}>This is animated!</Text>
      </Animated.View>
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
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
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
  searchIcon: {
    marginRight: 10,
  },
  icon: {
    paddingRight: 10,
  },
  selectedStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  textSelectedStyle: {
    fontSize: 14,
    marginRight: 5,
  },
});
