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
      <SearchInput inputWidth="100%" />

      <TouchableOpacity
        onPress={openFilter}
        style={[
          styles.filterButton,
          {
            backgroundColor: hexToRGBA(themeColors.primary as string, 0.08),
            borderColor: hexToRGBA(themeColors.primary as string, 0.18),
          },
        ]}>
        <Image
          tintColor={themeColors.primary as string}
          source={OtherIcons.Filter as ImageSourcePropType}
          style={styles.filterIcon}
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
    paddingVertical: 6,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    height: 25,
    width: 25,
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
