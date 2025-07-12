import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {IImageUploadProps} from '../../utils/types/PropsTypes';

/*************  ✨ Windsurf Command ⭐  *************/
/**

/*******  1de9abf0-3697-409d-a18f-e0bc82f5265b  *******/
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
export const requestStoragePermission = async () => {
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
const ImageUpload = ({
  images,
  setImages,
  maxNumber = 4,
  children,
  multiple = false,
}: IImageUploadProps) => {
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
        multiple: multiple,
        cropping: true,
        height: 500,
        width: 500,
        maxFiles: maxNumber,
      });
      const newImage = {
        uri: result.path,
        name: result?.filename ?? 'random.jpg',
        type: result?.mime ?? 'image/jpeg',
        mimeType: result?.mime ?? 'image/jpeg',
      };
      multiple ? setImages([...images, newImage]) : setImages([newImage]);
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

  return <TouchableOpacity onPress={pickImage}>{children}</TouchableOpacity>;
};

export default ImageUpload;
