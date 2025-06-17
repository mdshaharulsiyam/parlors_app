import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { IJila } from '../../utils/types/Types';
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

const Workers = () => {
  const { themeColors } = useGlobalContext()
  const [totalWorkers, setTotalWorkers] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);
  return (
    <View>
      <View style={styles.selectContainer}>
        <Text style={styles.selectHeading}>Workers (optional)</Text>
        <Select
          isMultiSelect={false}
          data={jila?.map((item: IJila) => ({
            label: item?.name,
            value: item?._id?.toString(),
          }))}
          // selectedValue={selectedValue}
          // setSelectedValue={setSelectedValue}
          placeholder="Select a worker"
          searchPlaceholder="search district"
          height={50}
          width="100%"
          borderColor={themeColors.green as string}
          borderWidth={2}
          validate={true}
          errorMessage="This field is required"
        />
      </View>

      <View style={styles.selectContainer}>
        <Text style={styles.selectHeading}>Number Of Workers</Text>
        <TextInput
          keyboardType="phone-pad"
          maxLength={2}
          style={[
            styles.input,
            {
              borderColor: themeColors.green as string,
              color: themeColors.black as string,
              borderWidth: 2,
            },
          ]}
          placeholderTextColor={hexToRGBA(themeColors.black as string, 0.6)}
          placeholder="Number Of Workers"
          value={totalWorkers?.toString()}
          onChangeText={(v) => setTotalWorkers(Number(v))}
        />
      </View>
      <TouchableOpacity
        //   onPress={handleProfileUpdate}
        style={[
          styles.button,
          {
            backgroundColor: themeColors.green as string,
          },
        ]}>
        {isUpdating ? (
          <ActivityIndicator size="small" color={themeColors.white as string} />
        ) : (
          <Text
            style={[
              styles.buttonText,
              {
                color: themeColors.white as string,
              },
            ]}>
            Update Profile
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default Workers

const styles = StyleSheet.create({
  selectContainer: {
    marginBottom: 8,
  },
  selectHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
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
