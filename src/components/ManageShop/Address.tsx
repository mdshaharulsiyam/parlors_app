import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { IJila, IPostOffice, IUnion, IUpazila } from '../../utils/types/Types';
import Select from '../Shared/Select';

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
const Address = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { themeColors } = useGlobalContext()
  return (
    <View>
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
          borderColor={themeColors.icon}
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
          borderColor={themeColors.icon}
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
          borderColor={themeColors.icon}
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
          borderColor={themeColors.icon}
          borderWidth={2}
          validate={true}
          errorMessage="This field is required"
        />
      </View>
      <TouchableOpacity
        //   onPress={handleProfileUpdate}
        style={[
          styles.button,
          {
            backgroundColor: themeColors.icon,
          },
        ]}>
        {isUpdating ? (
          <ActivityIndicator size="small" color={themeColors.white} />
        ) : (
          <Text
            style={[
              styles.buttonText,
              {
                color: themeColors?.white,
              },
            ]}>
            Update Profile
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default Address


const styles = StyleSheet.create({
  selectContainer: {
    marginBottom: 8,
  },
  selectHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});
