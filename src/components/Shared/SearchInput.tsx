import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {OtherIcons} from '../../constant/images';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {setSearch} from '../../Redux/States/Filters';
import {hexToRGBA} from '../../utils/hexToRGBA';
import Input from './Input';

const SearchInput = ({inputWidth}: {inputWidth?: any}) => {
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const {themeColors, width} = useGlobalContext();
  const dispatch = useDispatch();
  const search = useSelector((state: any) => state?.filters?.search);
  const handleSubmit = () => {
    navigate.navigate('Tabs', {screen: 'Parlors', params: {search}});
  };

  return (
    <View style={[styles.container, {width: inputWidth || width - 70}]}>
      <Input
        style={styles.input}
        value={search}
        handleSubmit={handleSubmit}
        setInputValue={value => dispatch(setSearch(value))}
        bordersColor={hexToRGBA(themeColors.primary as string, 0.4)}
        placeholder="Search by name"
        placeholderTextColor={hexToRGBA(themeColors.black as string, 0.4)}
        backgroundColor={hexToRGBA(themeColors.white as string, 0.95)}
        color={themeColors.black as string}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        activeOpacity={0.7}
        style={styles.searchButton}>
        <Image
          tintColor={themeColors.primary as string}
          source={OtherIcons.Search as ImageSourcePropType}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    height: 50,
    paddingRight: 48,
  },
  searchButton: {
    position: 'absolute',
    right: 10,
    top: 8,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    height: 24,
    width: 24,
  },
});
