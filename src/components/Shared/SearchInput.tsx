import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
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
        value={search}
        handleSubmit={handleSubmit}
        setInputValue={value => dispatch(setSearch(value))}
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
          transform: [{translateY: '-50%'}],
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
