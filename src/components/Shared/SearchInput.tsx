import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Input from './Input';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {OtherIcons} from '../../constant/images';
const SearchInput = () => {
  const {width} = Dimensions.get('window');
  const {themeColors, search, setSearch} = useGlobalContext();
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
        bordersColor={themeColors.icon2}
        placeholder="Search by Location ..."
        placeholderTextColor={hexToRGBA(themeColors.text, 0.3)}
        backgroundColor={themeColors.background2}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        activeOpacity={0.6}
        style={{
          position: 'absolute',
          right: 15,
          top: '50%',
          transform: [{translateY: '-50%'}],
        }}>
        <Image
          tintColor={themeColors.icon2}
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
