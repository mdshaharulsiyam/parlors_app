import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';

const Profile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { themeColors } = useGlobalContext()
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: "center"
        }}
      >
        <TouchableOpacity style={styles.profileImageContainer}>
          <View
            style={{
              backgroundColor: hexToRGBA(themeColors.icon, .5),
              borderRadius: 100,
            }}>
            <Image
              source={{
                uri: 'https://via.placeholder.com/100',
              }}
              style={styles.profileImage}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.selectContainer}>
        <Text style={styles.selectHeading}>Shop Name</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: themeColors.icon,
              color: themeColors.text,
              borderWidth: 2,
            },
          ]}
          placeholderTextColor={hexToRGBA(themeColors.text, 0.6)}
          placeholder="Shop Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.selectContainer}>
        <Text style={styles.selectHeading}>Shop Email (optional)</Text>
        <TextInput
          editable={true}
          style={[
            styles.input,
            {
              borderColor: themeColors.icon,
              color: themeColors.text,
              borderWidth: 2,
            },
          ]}
          placeholderTextColor={hexToRGBA(themeColors.text, 0.6)}
          placeholder="Shop Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.selectContainer}>
        <Text style={styles.selectHeading}>Shop Phone Number (optional)</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: themeColors.icon,
              color: themeColors.text,
              borderWidth: 2,
            },
          ]}
          placeholderTextColor={hexToRGBA(themeColors.text, 0.6)}
          placeholder="Shop Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
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
    </>
  )
}

export default Profile

const styles = StyleSheet.create({
  selectContainer: {
    marginBottom: 8,
  },
  selectHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
    width: 100
    // backgroundColor: hexToRGBA('#000000', 0.5),
  },
  profileImage: { width: 100, height: 100, borderRadius: 50 },

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
