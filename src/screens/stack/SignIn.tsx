import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Link, NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { ILogin } from '../../../types/loginType';
import { useLogin } from '../../ApisCalls/authApisCall';
import GradientButton from '../../components/Shared/GradientButton';
import { OtherIcons } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { setRole, setToken } from '../../Redux/States/userSlice';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { ScreenParamsType } from '../../utils/types/ScreenParamsType';
export const signIn = async () => {
  try {
    //   await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    //console.log(response);
    if (response) {
    } else {
      // sign in was cancelled by user
    }
  } catch (error: any) {
    //console.log(error);
    if (error) {
      switch (error?.code) {
        case statusCodes.IN_PROGRESS:
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          break;
        default:
      }
    } else {
    }
  }
};

export interface GoogleSignInResponse {
  idToken: string;
  scopes: string[];
  serverAuthCode: string | null;
  user: {
    email: string;
    familyName: string;
    givenName: string;
    id: string;
    name: string;
    photo: string;
  };
  type: 'success' | 'error';
}
const SignIn = () => {
  const dispatch = useDispatch()

  const { themeColors } = useGlobalContext();
  const navigate = useNavigation<NavigationProp<ScreenParamsType>>();
  const [passShow, setPassShow] = React.useState(true);
  const { signIn: signInHandler, isLoading } = useLogin()
  const [error, setError] = React.useState({
    email: false,
    password: false,
  });

  const [inputValue, setInputValue] = React.useState<ILogin>({
    email: 'siyamoffice0273@gmail.com',
    password: '123456',
  });

  const submitHandler = async () => {
    let isInvalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof ILogin] === '') {
        setError(prev => ({ ...prev, [key]: true }));
        isInvalid = true;
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
    if (isInvalid) {
      Toast.show({
        type: 'error',
        text1: 'failed to login',
        text2: 'Please fill all fields',
      });
    }
    const storeData = async (res: any) => {
      await Promise.all([
        AsyncStorage.setItem('token', res?.token),
        AsyncStorage.setItem('role', JSON.stringify(res?.role)),
      ])
      dispatch(setToken(res?.token))
      dispatch(setRole(res?.role))
      navigate.navigate('Tabs', { screen: 'Home' })
    }
    signInHandler(inputValue, storeData)
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: hexToRGBA(themeColors.white as string, .95) }}>
      {/* form */}
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        {Object.keys(inputValue).map((key, index) => (
          <View key={index}>
            <Text style={[globalStyles.inputLabel, {
              color: error[key as keyof ILogin] ? themeColors.red as string : themeColors.black as string,
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
                secureTextEntry={key === 'password' ? passShow : false}
                placeholderTextColor={hexToRGBA(themeColors.black as string, 0.3)}
                style={[
                  globalStyles.input,
                  {
                    borderColor: error[key as keyof ILogin]
                      ? themeColors.red as string
                      : hexToRGBA(themeColors.black as string, 0.4),
                    borderWidth: error[key as keyof ILogin] ? 1 : 0,
                    backgroundColor: hexToRGBA(themeColors.black as string, 0.2),
                    color: themeColors.black as string,
                  }
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
                    style={{ width: 20, height: 20, tintColor: themeColors.black as string }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <Link
          style={{ textAlign: 'right', marginBottom: 20, }}
          screen="Forget"
          params={{}}>
          <Text style={{ color: themeColors.primary as string }}>Forgot password?</Text>
        </Link>

        <View
          style={{
            paddingHorizontal: 25,
          }}>
          <GradientButton handler={() => submitHandler()}>
            {
              isLoading ? <ActivityIndicator size="small" color={themeColors.constWhite as string} /> : <Text
                style={{
                  color: themeColors.constWhite as string,
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                }}>
                Login
              </Text>
            }
          </GradientButton>
        </View>

        <View style={[globalStyles.flex, { marginTop: 20 }]}>
          <Text style={[globalStyles.text, {
            color: themeColors.black as string,
          }]}>
            Don't have an account ?
          </Text>
          <Link screen="SignUp" params={{}}>
            <Text style={[{ marginLeft: 5, color: themeColors.primary as string }, globalStyles.text]}>
              {"  "} Sign Up
            </Text>
          </Link>
        </View>

        <View style={{
          paddingHorizontal: 25,
          marginTop: 20,
        }}>
          {/* <GoogleSigninButton
            onPress={signIn}
            disabled={isSigninInProgress}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
          /> */}
          <GradientButton handler={() => signIn()}>
            {
              isLoading ? <ActivityIndicator size="small" color={themeColors.constWhite as string} /> : <Text
                style={{
                  color: themeColors.constWhite as string,
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                }}>
                Login with  Google
              </Text>
            }
          </GradientButton>
        </View>
      </View>
    </SafeAreaView>
  );
};



export default SignIn;

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
  passwordContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    fontSize: 14,
    marginBottom: 20,
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
});
