import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {OtherIcons} from '../../constant/images';
import {globalStyles} from '../../constant/styles';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {IImage} from '../../utils/types/Types';
import ImageUpload from './ImageUpload';

const SinglePicture = () => {
  const {themeColors} = useGlobalContext();
  const [images, setImages] = React.useState<IImage[]>([]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          position: 'relative',
        }}>
        <Image
          source={OtherIcons.Profile as ImageSourcePropType}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
        <ImageUpload images={images} setImages={setImages}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: themeColors.white as string,
              borderWidth: 1,
              borderColor: hexToRGBA(themeColors.black as string, 0.2),
              borderRadius: 50,
              padding: 5,
            }}>
            <Image
              source={OtherIcons.Camera as ImageSourcePropType}
              style={{
                width: 20,
                height: 20,
                tintColor: themeColors.primary as string,
              }}
            />
          </View>
        </ImageUpload>
      </View>
      <Text
        style={[
          globalStyles.inputLabel,
          {
            marginTop: 10,
            fontSize: 20,
          },
        ]}>
        Many Stake
      </Text>
    </View>
  );
};

export default SinglePicture;

const styles = StyleSheet.create({});
