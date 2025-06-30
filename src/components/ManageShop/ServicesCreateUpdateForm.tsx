import React, { useState } from 'react';
import { ActivityIndicator, Image, ImageSourcePropType, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useCategoriesApiCall } from '../../ApisCalls/categoryApiCall';
import { OtherIcons } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import SingleSelectDropDown from '../../screens/drawer/SingleSelectDropDown';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { IImage, IServicesInput, IServicesInputError, IServicesInputLabel } from '../../utils/types/Types';
import GradientButton from '../Shared/GradientButton';
import ImageUpload from '../Shared/ImageUpload';


const ServicesCreateUpdateForm = () => {
  const { themeColors } = useGlobalContext()
  const [img, setImg] = useState<IImage[]>([])
  const [categorySearch, setCategorySearch] = useState('')
  const [subCategorySearch, setSubCategorySearch] = useState('')
  const { categories, subCategories, isLoading } = useCategoriesApiCall(categorySearch, subCategorySearch)
  const [inputValue, setInputValue] = useState<IServicesInput>({
    name: '',
    category: '',
    sub_category: '',
    price: '',
    img: '',
    description: '',
  });
  const [error, setError] = useState<IServicesInputError>({
    name: false,
    price: false,
    description: false,
    img: false,
    category: false,
    sub_category: false,
  })
  const [inputLabel, setInputLabel] = useState<IServicesInputLabel>({
    name: 'Name',
    price: 'Price',
    description: 'Description',
    img: 'Image',
    category: 'Category',
    sub_category: 'Sub Category',
  })
  const submitHandler = () => {
    let isInvalid = false;

    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof IServicesInput] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        isInvalid = true;
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });

    if (isInvalid) {
      Toast.show({
        type: 'error',
        text1: 'Address is required',
        text2: 'Please fill all fields',
      });
      return
    }
  }
  return (
    <View>
      <Text style={{
        color: themeColors.black as string,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
      }}>Service Listing Form</Text>
      {Object.keys(inputValue).map((key, index, arr) => {
        if (key == 'category' || key == 'sub_category') {
          return (
            <View key={key}>
              <Text style={[globalStyles.inputLabel, {
                color: hexToRGBA(themeColors.black as string, 0.8),
              }]}>{inputLabel[key as keyof IServicesInputLabel]}</Text>
              <SingleSelectDropDown
                name={key}
                data={key === 'category' ? categories : subCategories}
                onChangeText={key === 'category' ? setCategorySearch : setSubCategorySearch}
                value={inputValue[key as keyof IServicesInput]}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setError={setError}
                error={error}
              />
            </View>
          );
        }
        if (key === "img") {
          return <View>
            <Text style={[globalStyles.inputLabel, {
              color: hexToRGBA(themeColors.black as string, 0.8),
            }]}>{inputLabel[key as keyof IServicesInputLabel]}</Text>
            <ImageUpload
              images={img}
              setImages={setImg}
            >
              <View style={[globalStyles.inputLabel, {
                flexDirection: 'row', alignItems: 'flex-start', gap: 10,
                backgroundColor: hexToRGBA(themeColors.black as string, 0.2),
                padding: 10,
                borderRadius: 5,
                paddingTop: 20,
              }]}>
                <Image source={OtherIcons.Camera as ImageSourcePropType} style={{ width: 20, height: 20, tintColor: themeColors.black as string }} />
                <Text style={[globalStyles.inputLabel, {
                  color: hexToRGBA(themeColors.black as string, 0.8),
                }]}>
                  {
                    img.length > 0 ? img?.[0]?.name : 'Add Image'
                  }
                </Text>
              </View>
            </ImageUpload>
          </View>
        }

        return (
          <View key={key} style={{}}>
            <Text style={[globalStyles.inputLabel, {
              color: hexToRGBA(themeColors.black as string, 0.8),
            }]}>
              {inputLabel[key as keyof IServicesInputLabel]}
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                value={inputValue[key as keyof IServicesInput]}
                onChangeText={text => {
                  setInputValue({ ...inputValue, [key]: text });
                  setError({ ...error, [key]: false });
                }}
                placeholder={`Enter your ${inputLabel[key as keyof IServicesInputLabel]}`}
                placeholderTextColor={hexToRGBA(themeColors.black as string, 0.4)}
                style={[
                  globalStyles.input,
                  {
                    borderColor: error[key as keyof IServicesInputError]
                      ? themeColors.red as string
                      : hexToRGBA(themeColors.black as string, 0.4),
                    borderWidth: error[key as keyof IServicesInputError] ? 1 : 0,
                    backgroundColor: hexToRGBA(themeColors.black as string, 0.2),
                    color: themeColors.black as string,
                  }
                ]}
              />
            </View>
          </View>
        );
      })}
      <GradientButton handler={submitHandler}>
        {false ? (
          <ActivityIndicator size="small" color={themeColors.constWhite as string} />
        ) : (
          <Text
            style={[
              {
                color: themeColors.constWhite as string,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '600',
              },
            ]}>
            Save
          </Text>
        )}
      </GradientButton>
    </View>
  )
}


export default ServicesCreateUpdateForm

const styles = StyleSheet.create({})