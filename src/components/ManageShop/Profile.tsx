import React, { useState } from 'react';
import { ActivityIndicator, Image, ImageSourcePropType, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { OtherIcons } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { setIndex, setProfile } from '../../Redux/States/vendorSlice';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { IImage, IShopInput, IShopInputError, IShopInputLabel } from '../../utils/types/Types';
import GradientButton from '../Shared/GradientButton';
import ImageUpload from '../Shared/ImageUpload';

const Profile = ({ creating = false }: { creating?: boolean }) => {
  const dispatch = useDispatch()
  const [isUpdating, setIsUpdating] = useState(false);
  const [inputValue, setInputValue] = useState<IShopInput>({
    name: '',
    email: '',
    contact: '',
  });
  const [error, setError] = useState<IShopInputError>({
    name: false,
    email: false,
    contact: false,
  })
  const [inputLabel, setInputLabel] = useState<IShopInputLabel>({
    name: 'Shop name',
    email: 'Shop Email (optional)',
    contact: 'Shop Phone (optional)',
  })

  const { themeColors } = useGlobalContext()
  const [images, setImages] = React.useState<IImage[]>([]);
  const submitHandler = () => {
    if (inputValue.name === '') {
      setError(prev => ({ ...prev, name: true }));
      Toast.show({
        type: 'error',
        text1: 'name is required',
        text2: 'Please fill name',
      });
      return
    }
    if (creating) {
      dispatch(setIndex(1))
      dispatch(setProfile(inputValue))
    } else {

    }
  }
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: "center",
        }}
      >
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
      {Object.keys(inputValue).map((key, index) => (
        <View key={index}>
          <Text style={[globalStyles.inputLabel, {
            color: error[key as keyof IShopInputError] ? themeColors.red as string : themeColors.black as string
          }]}>
            {inputLabel[key as keyof IShopInputLabel]}
          </Text>
          <View >
            <TextInput
              value={inputValue[key as keyof IShopInput]}
              onChangeText={text => {
                setInputValue({ ...inputValue, [key]: text });
                setError({ ...error, [key]: false });
              }}
              placeholder={`Enter ${key}`}
              placeholderTextColor={hexToRGBA(themeColors.black as string, 0.6)}
              style={[
                globalStyles.input,
                {
                  borderColor: error[key as keyof IShopInput]
                    ? themeColors.red as string
                    : hexToRGBA(themeColors.black as string, 0.4),
                  borderWidth: error[key as keyof IShopInput] ? 1 : 0,
                  backgroundColor: hexToRGBA(themeColors.black as string, 0.2),
                  color: themeColors.black as string,
                }

              ]}
            />

          </View>
        </View>
      ))}
      <GradientButton handler={submitHandler}>
        {isUpdating ? (
          <ActivityIndicator size="small" color={themeColors.white as string} />
        ) : (
          <Text
            style={[
              {
                color: themeColors.black as string,
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              },
            ]}>
            Save
          </Text>
        )}
      </GradientButton>
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
