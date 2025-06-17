import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { OtherIcons } from '../../constant/images';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { IJila, IPostOffice, IUnion, IUpazila } from '../../utils/types/Types';
import Input from './Input';
import Select from './Select';
const jila: IJila[] = [
  {
    _id: 1,
    name: 'Dhaka',
    upazila: [
      { _id: 1, name: 'Dhaka City' },
      { _id: 2, name: 'Narayanganj' },
      { _id: 3, name: 'Keraniganj' },
      { _id: 4, name: 'Dhamrai' },
      { _id: 5, name: 'Savar' },
      { _id: 6, name: 'Madhupur' },
      { _id: 7, name: 'Tongi' },
    ],
  },
  {
    _id: 2,
    name: 'Faridpur',
    upazila: [
      { _id: 1, name: 'Faridpur Sadar' },
      { _id: 2, name: 'Boalmari' },
      { _id: 3, name: 'Alfadanga' },
      { _id: 4, name: 'Nagarkanda' },
      { _id: 5, name: 'Charbhadrasan' },
      { _id: 6, name: 'Sadar Upazila' },
    ],
  },
  {
    _id: 3,
    name: 'Chattogram',
    upazila: [
      { _id: 1, name: 'Chattogram City' },
      { _id: 2, name: 'Anwara' },
      { _id: 3, name: 'Banshkhali' },
      { _id: 4, name: 'Boalkhali' },
      { _id: 5, name: 'Fatikchhari' },
      { _id: 6, name: 'Sandwip' },
    ],
  },
  {
    _id: 4,
    name: 'Rajshahi',
    upazila: [
      { _id: 1, name: 'Rajshahi Sadar' },
      { _id: 2, name: 'Bagha' },
      { _id: 3, name: 'Puthia' },
      { _id: 4, name: 'Durgapur' },
      { _id: 5, name: 'Tanore' },
      { _id: 6, name: 'Godagari' },
    ],
  },
  {
    _id: 5,
    name: 'Khulna',
    upazila: [
      { _id: 1, name: 'Khulna City' },
      { _id: 2, name: 'Dighalia' },
      { _id: 3, name: 'Koyra' },
      { _id: 4, name: 'Paikgachha' },
      { _id: 5, name: 'Batiaghata' },
      { _id: 6, name: 'Rupsha' },
    ],
  },
];

const union: IUnion[] = [
  { _id: 1, name: 'Dhandi Union' },
  { _id: 2, name: 'Khatra Union' },
  { _id: 3, name: 'Madhpur Union' },
  { _id: 4, name: 'Nandigram Union' },
  { _id: 5, name: 'Bholahat Union' },
  { _id: 6, name: 'Banshbari Union' },
  { _id: 7, name: 'Manikdi Union' },
  { _id: 8, name: 'Mathurapur Union' },
];
const postOffice: IPostOffice[] = [
  { _id: 1, name: 'Dhandi Dakghor' },
  { _id: 2, name: 'Khatra Dakghor' },
  { _id: 3, name: 'Madhpur Dakghor' },
  { _id: 4, name: 'Bholahat Dakghor' },
  { _id: 5, name: 'Manikdi Dakghor' },
];

const FilterOptions = () => {
  const { width } = Dimensions.get('window');
  const { themeColors, search, setSearch } = useGlobalContext();
  const handleSearch = (value: string) => console.log(value);
  const handleSubmit = () => {
    console.log(search);
  };
  return (
    <ScrollView
      style={{
        padding: 8,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          marginBottom: 10,
        }}>
        Filter by
      </Text>
      <View
        style={[
          {
            paddingHorizontal: 3,
            marginBottom: 10,
            position: 'relative',
            width: width,
          },
        ]}>
        <Input
          style={{
            height: 50,
          }}
          handleSubmit={handleSearch}
          setInputValue={value => setSearch(value)}
          bordersColor={themeColors.green as string}
          placeholder="Search by Parlors Name ..."
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
      {/* district */}
      <View style={styles.selectContainer}>
        <Text style={styles.selectHeading}>District</Text>
        <Select
          isMultiSelect={false}
          data={jila?.map((item: IJila) => ({
            label: item?.name,
            value: item?._id?.toString(),
          }))}
          // selectedValue={selectedValue}
          // setSelectedValue={setSelectedValue}
          placeholder="Select a District"
          searchPlaceholder="search district"
          height={50}
          width="100%"
          borderColor={themeColors.green as string}
          borderWidth={2}
          validate={true}
          errorMessage="This field is required"
        />
      </View>
      {/* sub - district */}
      <View style={styles.selectContainer}>
        <Text style={styles.selectHeading}>Sub District</Text>
        <Select
          isMultiSelect={false}
          data={jila[0]?.upazila?.map((item: IUpazila) => ({
            label: item?.name,
            value: item?._id?.toString(),
          }))}
          // selectedValue={selectedValue}
          // setSelectedValue={setSelectedValue}
          placeholder="Select a sub district"
          searchPlaceholder="search sub district"
          height={50}
          width="100%"
          borderColor={themeColors.green as string}
          borderWidth={2}
          validate={true}
          errorMessage="This field is required"
        />
      </View>
      {/* union */}
      <View style={styles.selectContainer}>
        <Text style={styles.selectHeading}>Union</Text>
        <Select
          isMultiSelect={false}
          data={union?.map((item: IUpazila) => ({
            label: item?.name,
            value: item?._id?.toString(),
          }))}
          // selectedValue={selectedValue}
          // setSelectedValue={setSelectedValue}
          placeholder="Select a union"
          searchPlaceholder="search union"
          height={50}
          width="100%"
          borderColor={themeColors.green as string}
          borderWidth={2}
          validate={true}
          errorMessage="This field is required"
        />
      </View>
      {/* post office */}
      <View style={styles.selectContainer}>
        <Text style={styles.selectHeading}>Post office</Text>
        <Select
          isMultiSelect={false}
          data={postOffice?.map((item: IUpazila) => ({
            label: item?.name,
            value: item?._id?.toString(),
          }))}
          // selectedValue={selectedValue}
          // setSelectedValue={setSelectedValue}
          placeholder="Select a post office"
          searchPlaceholder="search post office"
          height={50}
          width="100%"
          borderColor={themeColors.green as string}
          borderWidth={2}
          validate={true}
          errorMessage="This field is required"
        />
      </View>
    </ScrollView>
  );
};

export default FilterOptions;

const styles = StyleSheet.create({
  selectContainer: {
    marginBottom: 8,
  },
  selectHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
});
