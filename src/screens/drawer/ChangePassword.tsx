import React from 'react';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {IChangePassword} from '../../../types/loginType';
import {useChangePassword} from '../../ApisCalls/authApisCall';
import GradientButton from '../../components/Shared/GradientButton';
import {OtherIcons} from '../../constant/images';
import {globalStyles} from '../../constant/styles';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {ScreenParamsType} from '../../utils/types/ScreenParamsType';

const ChangePassword = () => {
  const {themeColors, height} = useGlobalContext();
  const [passShow, setPassShow] = React.useState(true);
  const [opassShow, setOPassShow] = React.useState(true);
  const [cPassShow, setCPassShow] = React.useState(true);
  const {width} = Dimensions.get('window');
  const navigate = useNavigation<NavigationProp<ScreenParamsType>>();
  const {submitHandler: changePassword, isLoading} = useChangePassword();

  const [error, setError] = React.useState({
    'current password': false,
    'new password': false,
    'confirm password': false,
  });

  const [inputValue, setInputValue] = React.useState<IChangePassword>({
    'current password': '',
    'new password': '',
    'confirm password': '',
  });

  const submitHandler = () => {
    let invalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof IChangePassword] === '') {
        setError(prev => ({...prev, [key]: true}));
        invalid = true;
      } else {
        setError(prev => ({...prev, [key]: false}));
      }
    });
    if (invalid) {
      Toast.show({
        type: 'error',
        text1: 'failed to change password',
        text2: 'Please fill all fields',
      });
      return;
    }
    const data = {
      password: inputValue['new password'],
      confirm_password: inputValue['confirm password'],
      old_password: inputValue['current password'],
    };
    changePassword(data, () => {
      navigate.goBack();
    });
  };

  return (
    <SafeAreaView
      style={{
        position: 'relative',
        height: height,
        backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
      }}>
      <ScrollView
        style={{
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        {Object.keys(inputValue).map(key => {
          return (
            <View key={key} style={{}}>
              <Text
                style={[
                  globalStyles.inputLabel,
                  {
                    color: error[key as keyof IChangePassword]
                      ? (themeColors.red as string)
                      : (themeColors.black as string),
                  },
                ]}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <View style={{position: 'relative'}}>
                <TextInput
                  value={inputValue[key as keyof IChangePassword]}
                  onChangeText={text => {
                    setInputValue({...inputValue, [key]: text});
                    setError({...error, [key]: false});
                  }}
                  placeholder={`Enter your ${key}`}
                  secureTextEntry={
                    key === 'new password'
                      ? passShow
                      : key === 'confirm password'
                      ? cPassShow
                      : opassShow
                  }
                  placeholderTextColor={
                    error[key as keyof IChangePassword]
                      ? (themeColors.red as string)
                      : hexToRGBA(themeColors.black as string, 0.5)
                  }
                  style={[
                    globalStyles.input,
                    {
                      borderColor: error[key as keyof IChangePassword]
                        ? (themeColors.red as string)
                        : hexToRGBA(themeColors.black as string, 0.4),
                      borderWidth: error[key as keyof IChangePassword] ? 1 : 0,
                      backgroundColor: hexToRGBA(
                        themeColors.black as string,
                        0.2,
                      ),
                      color: themeColors.black as string,
                    },
                  ]}
                />
                {(key === 'new password' ||
                  key === 'confirm password' ||
                  key === 'current password') && (
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 18}}
                    onPress={() => {
                      if (key === 'new password') {
                        setPassShow(!passShow);
                      } else if (key === 'confirm password') {
                        setCPassShow(!cPassShow);
                      } else {
                        setOPassShow(!opassShow);
                      }
                    }}>
                    <Image
                      source={
                        key === 'new password'
                          ? passShow
                            ? (OtherIcons.Eye as ImageSourcePropType)
                            : (OtherIcons.EyeX as ImageSourcePropType)
                          : key === 'confirm password'
                          ? cPassShow
                            ? (OtherIcons.Eye as ImageSourcePropType)
                            : (OtherIcons.EyeX as ImageSourcePropType)
                          : opassShow
                          ? (OtherIcons.Eye as ImageSourcePropType)
                          : (OtherIcons.EyeX as ImageSourcePropType)
                      }
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: themeColors.black as string,
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 25,
          position: 'absolute',
          bottom: 100,
          width: width,
          paddingVertical: 16,
        }}>
        <GradientButton handler={submitHandler}>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={themeColors.constWhite as string}
            />
          ) : (
            <Text
              style={{
                color: themeColors.constWhite as string,
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 18,
              }}>
              Save Changes
            </Text>
          )}
        </GradientButton>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
