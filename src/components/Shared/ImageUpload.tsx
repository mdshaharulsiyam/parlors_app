import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { IImageUploadProps } from '../../utils/types/PropsTypes';

export const requestCameraPermission = async () => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
const ImageUpload = ({
  images,
  setImages,
  maxNumber,
  children,
}: IImageUploadProps) => {
  const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to select images',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  const pickImage = async () => {
    const hasStoragePermission = await requestStoragePermission();
    if (!hasStoragePermission) {
      Alert.alert(
        'Permission denied',
        'Storage permission is required to select images',
      );
      return;
    }
    try {
      const result = await ImagePicker.openPicker({
        cropping: false,
      });
      const newImage = {
        uri: result.path,
        name: result?.filename ?? "random.jpg",
        type: result?.mime ?? "image/jpeg",
        mimeType: result?.mime ?? "image/jpeg",
      }
      setImages([...images, newImage]);
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

  return <TouchableOpacity onPress={pickImage}>{children}</TouchableOpacity>;
};

export default ImageUpload;
