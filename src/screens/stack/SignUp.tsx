import { Link, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import CountryPicker from 'react-native-country-picker-modal';

import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ILogin, ISignUp } from '../../../types/loginType';
import GradientButton from '../../components/Shared/GradientButton';
import { genderData } from '../../constant/data';
import { OtherIcons } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useRegisterMutation } from '../../Redux/Apis/authApis';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { ScreenParamsType } from '../../utils/types/ScreenParamsType';
import { signIn } from './SignIn';

const SignUp = () => {
  const navigation = useNavigation<NavigationProp<ScreenParamsType>>()
  const [passShow, setPassShow] = React.useState(true);
  const [cPassShow, setCPassShow] = React.useState(true);
  const [countryCode, setCountryCode] = React.useState('BD');
  const [callingCode, setCallingCode] = React.useState('880');
  const { themeColors, width } = useGlobalContext();
  const [error, setError] = React.useState({
    'name': false,
    email: false,
    contact: false,
    gender: false,
    password: false,
    confirmPassword: false,
  });

  const [inputValue, setInputValue] = React.useState<ISignUp>({
    'name': 'shaharul',
    contact: '01700000000',
    email: 'siyamoffice0273@gmail.com',
    gender: 'male',
    password: '123456',
    confirmPassword: '123456',
  });
  //rtk
  const [register, { isLoading }] = useRegisterMutation()

  const submitHandler = useCallback(() => {
    let isInvalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof ISignUp] === '') {
        isInvalid = true;
        setError(prev => ({ ...prev, [key]: true }));
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (isInvalid) {
      Toast.show({
        type: 'error',
        text1: "Please fill all fields",
        text2: "All fields are required",
      });
      return;
    }
    const data = {
      "name": inputValue['name'],
      "contact": inputValue['contact'],
      "email": inputValue['email'],
      "gender": inputValue['gender'],
      "password": inputValue['password']
    }
    register(data)
      .unwrap()
      .then((res) => {
        // navigation.navigate('Otp', { params: { from: "signup", email: inputValue['email'] } });
        Toast.show({
          type: 'success',
          text1: "registered successfully",
          text2: res.message,
        });
      }
      )
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1: "registration failed",
          text2: err.data?.message || "Something went wrong",
        });
      }
      );
  }, [register, inputValue,]);

  return (
    <SafeAreaView
      style={{ backgroundColor: hexToRGBA(themeColors.white as string, .95) }}
    >
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginTop: 40,
          zIndex: 1
        }}>
        {Object.keys(inputValue).map((key, index, arr) => {

          if (key === 'gender') {
            return (
              <View key={key} style={{ zIndex: 100000000 }}>
                <Text style={[globalStyles.inputLabel, { color: error[key as keyof ILogin] ? themeColors.red as string : themeColors.black as string }]}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                <Dropdown
                  style={[
                    globalStyles.input,
                    error[key as keyof ILogin] ? globalStyles.inputError : {},
                    {
                      borderColor: error[key as keyof ILogin] ? themeColors.red as string : hexToRGBA(themeColors.black as string, 0.2)
                    },
                  ]}
                  data={genderData}
                  labelField="label"
                  valueField="value"
                  placeholder={`Select ${key}`}
                  value={inputValue.gender}
                  onChange={item => {
                    setInputValue({ ...inputValue, gender: item.value });
                    setError({ ...error, gender: false });
                  }}
                  placeholderStyle={{
                    color: globalStyles.inputPlaceholder.color,
                  }}
                  selectedTextStyle={{ color: themeColors.black as string }}
                  containerStyle={{ borderRadius: 5 }}
                  dropdownPosition="auto"
                />
              </View>
            );
          }
          if (key === 'contact') {
            return (
              <View key={key}>
                <Text style={globalStyles.inputLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CountryPicker
                    countryCode={countryCode as any}
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    onSelect={country => {
                      setCountryCode(country.cca2);
                      setCallingCode(country.callingCode[0]);
                    }}
                    containerButtonStyle={{
                      width: 110,
                      height: 50,
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                    }}
                    theme={{
                      onBackgroundTextColor: themeColors.black as string,
                    }}
                  />

                  <TextInput
                    value={inputValue.contact}
                    onChangeText={text => {
                      setInputValue({ ...inputValue, contact: text });
                      setError({ ...error, contact: false });
                    }}
                    placeholder={`Enter your ${key}`}
                    // keyboardType="phone-pad"
                    keyboardType="decimal-pad"
                    placeholderTextColor={hexToRGBA(themeColors.black as string, 0.4)}
                    style={[
                      globalStyles.input,
                      {
                        paddingHorizontal: 12,
                        borderBottomRightRadius: 8,
                        borderWidth: 1,
                        width: width - 150,
                        marginBottom: 0,
                        color: themeColors.black as string,
                        borderColor: error[key as keyof ILogin] ? themeColors.red as string : hexToRGBA(themeColors.black as string, 0.2)
                      },
                      // error.contact ? globalStyles.inputError : {},
                    ]}
                  />
                </View>
              </View>
            );
          }
          return (
            <View key={key} style={{}}>
              <Text style={[globalStyles.inputLabel, {
                color: error[key as keyof ILogin] ? themeColors.red as string : themeColors.black as string
              }]}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={inputValue[key as keyof ILogin]}
                  onChangeText={text => {
                    setInputValue({ ...inputValue, [key]: text });
                    setError({ ...error, [key]: false });
                  }}
                  placeholder={`Enter your ${key}`}
                  placeholderTextColor={hexToRGBA(themeColors.black as string, 0.4)}
                  secureTextEntry={
                    key === 'password'
                      ? passShow
                      : key === 'confirmPassword'
                        ? cPassShow
                        : false
                  }
                  style={[
                    globalStyles.input,
                    {
                      color: themeColors.black as string,
                      borderColor: error[key as keyof ILogin] ? themeColors.red as string : hexToRGBA(themeColors.black as string, 0.2)
                    }
                  ]}
                />
                {(key === 'password' || key === 'confirmPassword') && (
                  <TouchableOpacity
                    style={{ position: 'absolute', right: 10, top: 15 }}
                    onPress={() => {
                      if (key === 'password') {
                        setPassShow(!passShow);
                      } else {
                        setCPassShow(!cPassShow);
                      }
                    }}>
                    <Image
                      source={
                        key === 'password'
                          ? passShow
                            ? (OtherIcons.Eye as ImageSourcePropType)
                            : (OtherIcons.EyeX as ImageSourcePropType)
                          : cPassShow
                            ? (OtherIcons.Eye as ImageSourcePropType)
                            : (OtherIcons.EyeX as ImageSourcePropType)
                      }
                      style={{ width: 20, height: 20 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}

        <View style={{ paddingHorizontal: 25 }}>
          <GradientButton handler={() => submitHandler()}>
            {
              isLoading ? <ActivityIndicator size="large" color="#FFFFFF" /> : <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: 18,
                }}>
                Sign Up
              </Text>
            }

          </GradientButton>
        </View>

        <View style={[globalStyles.flex, { marginTop: 20, }]}>
          <Text style={[globalStyles.text, {
            color: themeColors.black as string
          }]}>Already have an account? {"  "}</Text>
          <Link screen="SignIn" params={{}}>
            <Text style={[{ marginLeft: 5 }, globalStyles.text]}>Login</Text>
          </Link>
        </View>
        <View style={{ marginBottom: 120, marginTop: 20 }}>
          <GradientButton handler={() => signIn()}>
            {
              isLoading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                }}>
                Login with  Google
              </Text>
            }
          </GradientButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginVertical: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleVisibility: {
    position: 'absolute',
    right: 15,
    padding: 5,
    top: 7,
  },
});

export default SignUp;
