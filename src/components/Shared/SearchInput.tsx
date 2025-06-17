import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { OtherIcons } from '../../constant/images';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
import Input from './Input';
const SearchInput = () => {
  const { width } = Dimensions.get('window');
  const { themeColors, search, setSearch } = useGlobalContext();
  const handleSearch = (value: string) => console.log(value);
  const handleSubmit = () => {
    console.log(search);
  };
  return (
    <View
      style={[
        {
          paddingHorizontal: 3,
          position: 'relative',
          width: width - 70,
        },
      ]}>
      <Input
        style={{
          height: 50,
        }}
        handleSubmit={handleSearch}
        setInputValue={value => setSearch(value)}
        bordersColor={themeColors.green as string}
        placeholder="Search by Location ..."
        placeholderTextColor={hexToRGBA(themeColors.black as string, 0.3)}
        backgroundColor={themeColors.white as string}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        activeOpacity={0.6}
        style={{
          position: 'absolute',
          right: 15,
          top: '50%',
          transform: [{ translateY: '-50%' }],
        }}>
        <Image
          tintColor={themeColors.green as string}
          source={OtherIcons.Search as ImageSourcePropType}
          height={10}
          width={10}
          style={{
            height: 30,
            width: 30,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
