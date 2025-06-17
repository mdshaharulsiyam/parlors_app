import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { OtherIcons } from '../../constant/images';
import { hexToRGBA } from '../../utils/hexToRGBA';
import SearchInput from './SearchInput';

const SearchFilterTrigger = () => {
  const { themeColors, setModalOpen } = useGlobalContext();
  return (
    <View style={styles.headerContainer}>
      <SearchInput />
      <TouchableOpacity
        onPress={() => setModalOpen(true)}
        style={{
          backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
          padding: 6,
          paddingHorizontal: 10,
          borderRadius: 2,
        }}>
        <Image
          tintColor={themeColors.green as string}
          source={OtherIcons.Filter as ImageSourcePropType}
          height={10}
          width={10}
          style={{
            height: 35,
            width: 35,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchFilterTrigger;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
  },
});
