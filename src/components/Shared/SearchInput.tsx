import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { OtherIcons } from '../../constant/images';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
import Input from './Input';
const SearchInput = ({ inputWidth }: { inputWidth?: any }) => {
  const { themeColors, search, setSearch, width } = useGlobalContext();
  const handleSearch = (value: string) => console.log(value);
  const handleSubmit = (e: any) => {
    e?.preventDefault?.();
    console.log(search);
  };
  return (
    <View
      style={[
        {
          paddingHorizontal: 3,
          position: 'relative',
          width: inputWidth || width - 70,
        },
      ]}>
      <Input
        style={{
          height: 50,
        }}
        handleSubmit={handleSearch}
        onChange={(value: any) => setSearch(value)}
        // setInputValue={value => setSearch(value)}
        bordersColor={hexToRGBA(themeColors.primary as string, 0.4)}
        placeholder="Search by name ..."
        placeholderTextColor={hexToRGBA(themeColors.black as string, 0.4)}
        backgroundColor={hexToRGBA(themeColors.white as string, 0.95)}
        color={themeColors.black as string}
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
          tintColor={themeColors.primary as string}
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
