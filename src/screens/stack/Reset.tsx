import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { INewPassword } from '../../../types/loginType';
import { useResetPassword } from '../../ApisCalls/authApisCall';
import GradientButton from '../../components/Shared/GradientButton';
import { OtherIcons } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { setResetToken } from '../../Redux/States/userSlice';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { ScreenParamsType } from '../../utils/types/ScreenParamsType';
const Reset = () => {
  const navigate = useNavigation<NavigationProp<ScreenParamsType>>();
  const [passShow, setPassShow] = React.useState(true);
  const [cPassShow, setCPassShow] = React.useState(true);
  const { themeColors } = useGlobalContext();
  const [error, setError] = React.useState({
    password: false,
    confirmPassword: false,
  });

  const [inputValue, setInputValue] = React.useState<INewPassword>({
    password: '123456',
    confirmPassword: '123456',
  });
  const { submitHandler: resetPassword, isLoading: resetLoading } = useResetPassword()
  const dispatch = useDispatch()
  const submitHandler = () => {
    let invalid = false
    // navigate.navigate('Tabs', { screen: 'Home', });
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof INewPassword] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        invalid = true
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (invalid) {
      Toast.show({
        type: 'error',
        text1: 'failed to reset password',
        text2: 'Please fill all fields',
      });
    }
    const data = {
      password: inputValue.password,
      confirm_password: inputValue.confirmPassword
    }
    resetPassword(data, () => {
      dispatch(setResetToken(''))
      navigate.navigate('Stacks', { screen: 'SignIn', })
    })
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: hexToRGBA(themeColors.white as string, .95) }}>
      <View >
        <Image source={OtherIcons.Logo as ImageSourcePropType} style={{ height: 100, width: 100 }} />
      </View>
      {/* form */}
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        {Object.keys(inputValue).map((key, index) => (
          <View key={index}>
            <Text style={[globalStyles.inputLabel, {
              color: error[key as keyof INewPassword] ? themeColors.red as string : themeColors.black as string
            }]}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                value={inputValue[key as keyof INewPassword]}
                onChangeText={text => {
                  setInputValue({ ...inputValue, [key]: text });
                  setError({ ...error, [key]: false });
                }}
                placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                secureTextEntry={
                  key === 'password'
                    ? passShow
                    : key === 'confirmPassword'
                      ? cPassShow
                      : false
                }
                placeholderTextColor={hexToRGBA(themeColors.black as string, .4)}
                style={[
                  globalStyles.input,
                  {
                    borderColor: error[key as keyof INewPassword]
                      ? themeColors.red as string
                      : hexToRGBA(themeColors.black as string, 0.4),
                    borderWidth: error[key as keyof INewPassword] ? 1 : 0,
                    backgroundColor: hexToRGBA(themeColors.black as string, 0.2),
                    color: themeColors.black as string,
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
                    style={{ width: 20, height: 20, tintColor: themeColors.black as string }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <View
          style={{
            paddingHorizontal: 25,
          }}>
          <GradientButton handler={() => submitHandler()}>
            {
              resetLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: 18,
                  }}>
                  Submit
                </Text>
              )
            }
          </GradientButton>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

});

export default Reset;
