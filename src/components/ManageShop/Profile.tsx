import React, { useState } from 'react';
import { ActivityIndicator, Image, ImageSourcePropType, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { OtherIcons } from '../../constant/images';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { IImage } from '../../utils/types/Types';
import ImageUpload from '../Shared/ImageUpload';

const Profile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { themeColors } = useGlobalContext()
  const [images, setImages] = React.useState<IImage[]>([]);
  console.log(images);
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: "center"
        }}
      >
        {/* <TouchableOpacity style={styles.profileImageContainer}>
          <View
            style={{
              backgroundColor: hexToRGBA(themeColors.primary as string, .5),
              borderRadius: 100,
            }}>
            <Image
              source={{
                uri: 'https://via.placeholder.com/100',
              }}
              style={styles.profileImage}
            />
          </View>
        </TouchableOpacity> */}

        <ImageUpload images={images} setImages={setImages}>
          <View
            style={[
              styles.profileImageContainer, {
                backgroundColor: themeColors.white as string,
                borderWidth: 1,
                borderColor: hexToRGBA(themeColors.black as string, 0.2),
                borderRadius: 50,
                position: 'relative',
              }]}>
            <Image
              source={{ uri: images?.length > 0 ? images[0].uri : 'https://via.placeholder.com/100', }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
            <Image
              source={OtherIcons.Camera as ImageSourcePropType}
              style={{
                position: 'absolute',
                bottom: 10,
                right: 5,
                width: 20,
                height: 20,
                tintColor: themeColors.primary as string,
              }}
            />
          </View>
        </ImageUpload>
      </View>

      <View style={styles.selectContainer}>
        <Text style={styles.selectHeading}>Shop Name</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: themeColors.green as string,
              color: themeColors.black as string,
              borderWidth: 2,
            },
          ]}
          placeholderTextColor={hexToRGBA(themeColors.black as string, 0.6)}
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
              borderColor: themeColors.green as string,
              color: themeColors.black as string,
              borderWidth: 2,
            },
          ]}
          placeholderTextColor={hexToRGBA(themeColors.black as string, 0.6)}
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
              borderColor: themeColors.green as string,
              color: themeColors.black as string,
              borderWidth: 2,
            },
          ]}
          placeholderTextColor={hexToRGBA(themeColors.black as string, 0.6)}
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
