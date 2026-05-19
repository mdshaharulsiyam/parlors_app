import AsyncStorage from '@react-native-async-storage/async-storage';
import {Link, NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {ILogin} from '../../../types/loginType';
import {useLogin} from '../../ApisCalls/authApisCall';
import GradientButton from '../../components/Shared/GradientButton';
import {OtherIcons} from '../../constant/images';
import {globalStyles} from '../../constant/styles';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {setRole, setToken} from '../../Redux/States/userSlice';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {ScreenParamsType} from '../../utils/types/ScreenParamsType';

const SignIn = () => {
  const dispatch = useDispatch();

  const {themeColors} = useGlobalContext();
  const navigate = useNavigation<NavigationProp<ScreenParamsType>>();
  const [passShow, setPassShow] = React.useState(true);
  const {signIn: signInHandler, isLoading} = useLogin();
  const [error, setError] = React.useState({
    email: false,
    password: false,
  });

  const [inputValue, setInputValue] = React.useState<ILogin>({
    email: 'customer@salonpro.local',
    password: '123456',
  });

  const submitHandler = async () => {
    let isInvalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof ILogin] === '') {
        setError(prev => ({...prev, [key]: true}));
        isInvalid = true;
      } else {
        setError(prev => ({...prev, [key]: false}));
      }
    });
    if (isInvalid) {
      Toast.show({
        type: 'error',
        text1: 'failed to login',
        text2: 'Please fill all fields',
      });
      return;
    }
    const storeData = async (res: any) => {
      await Promise.all([
        AsyncStorage.setItem('token', res?.token),
        AsyncStorage.setItem('role', JSON.stringify(res?.role)),
      ]);
      dispatch(setToken(res?.token));
      dispatch(setRole(res?.role));
      navigate.navigate('Tabs', {screen: 'Home'});
    };
    signInHandler(inputValue, storeData);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: hexToRGBA(themeColors.white as string, 0.95),
      }}>
      {/* form */}
      <View style={{width: '100%', paddingHorizontal: 20}}>
        {Object.keys(inputValue).map((key, index) => (
          <View key={index}>
            <Text
              style={[
                globalStyles.inputLabel,
                {
                  color: error[key as keyof ILogin]
                    ? (themeColors.red as string)
                    : (themeColors.black as string),
                },
              ]}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <View style={{position: 'relative'}}>
              <TextInput
                value={inputValue[key as keyof ILogin]}
                onChangeText={text => {
                  setInputValue({...inputValue, [key]: text});
                  setError({...error, [key]: false});
                }}
                placeholder={`Enter your ${key}`}
                secureTextEntry={key === 'password' ? passShow : false}
                placeholderTextColor={hexToRGBA(
                  themeColors.black as string,
                  0.3,
                )}
                style={[
                  globalStyles.input,
                  {
                    borderColor: error[key as keyof ILogin]
                      ? (themeColors.red as string)
                      : hexToRGBA(themeColors.black as string, 0.4),
                    borderWidth: error[key as keyof ILogin] ? 1 : 0,
                    backgroundColor: hexToRGBA(
                      themeColors.black as string,
                      0.2,
                    ),
                    color: themeColors.black as string,
                  },
                ]}
              />
              {key === 'password' && (
                <TouchableOpacity
                  style={[
                    {
                      position: 'absolute',
                      right: 10,
                      top: 18,
                    },
                  ]}
                  onPress={() => setPassShow(!passShow)}>
                  <Image
                    source={
                      passShow
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
        ))}

        <Link
          style={{textAlign: 'right', marginBottom: 20}}
          screen="Forget"
          params={{}}>
          <Text style={{color: themeColors.primary as string}}>
            Forgot password?
          </Text>
        </Link>

        <View
          style={{
            paddingHorizontal: 25,
          }}>
          <GradientButton handler={() => submitHandler()}>
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
                Login
              </Text>
            )}
          </GradientButton>
        </View>

        <View style={[globalStyles.flex, {marginTop: 20}]}>
          <Text
            style={[
              globalStyles.text,
              {
                color: themeColors.black as string,
              },
            ]}>
            Don't have an account ?
          </Text>
          <Link screen="SignUp" params={{}}>
            <Text
              style={[
                {marginLeft: 5, color: themeColors.primary as string},
                globalStyles.text,
              ]}>
              {'  '} Sign Up
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
