import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {OtherIcons} from '../../constant/images';
import {hexToRGBA} from '../../utils/hexToRGBA';
import FilterOptions from './FilterOptions';
import SearchInput from './SearchInput';

const SearchFilterTrigger = () => {
  const {themeColors, isFilterOpen, openFilter, closeFilter} =
    useGlobalContext();

  return (
    <View style={styles.headerContainer}>
      <SearchInput />

      <TouchableOpacity
        onPress={openFilter}
        style={{
          backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
          padding: 6,
          paddingHorizontal: 10,
          borderRadius: 2,
        }}>
        <Image
          tintColor={themeColors.primary as string}
          source={OtherIcons.Filter as ImageSourcePropType}
          height={10}
          width={10}
          style={{
            height: 35,
            width: 35,
          }}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent
        visible={isFilterOpen}
        onRequestClose={closeFilter}>
        <View style={styles.modalScrim}>
          <View
            style={[
              styles.modalSheet,
              {backgroundColor: themeColors.white as string},
            ]}>
            <FilterOptions />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SearchFilterTrigger;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
  },
  modalScrim: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
  },
  modalSheet: {
    maxHeight: '86%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
});
