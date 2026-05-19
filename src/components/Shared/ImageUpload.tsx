import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {IImageUploadProps} from '../../utils/types/PropsTypes';

const ImageUpload = ({
  images,
  setImages,
  maxNumber = 4,
  children,
  multiple = false,
}: IImageUploadProps) => {
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permission denied',
        'Storage permission is required to select images',
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: !multiple,
        allowsMultipleSelection: multiple,
        aspect: [1, 1],
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.9,
        selectionLimit: maxNumber,
      });

      if (result.canceled) return;

      const pickedImages = result.assets.map((asset, index) => {
        const mimeType = asset.mimeType ?? 'image/jpeg';
        return {
          uri: asset.uri,
          name: asset.fileName ?? `parlors-upload-${Date.now()}-${index}.jpg`,
          type: mimeType,
          mimeType,
        };
      });

      setImages(
        multiple
          ? [...images, ...pickedImages].slice(0, maxNumber)
          : pickedImages,
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  return <TouchableOpacity onPress={pickImage}>{children}</TouchableOpacity>;
};

export default ImageUpload;
