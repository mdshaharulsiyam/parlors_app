import AsyncStorage from '@react-native-async-storage/async-storage';
import {Link, NavigationProp, useNavigation} from '@react-navigation/native';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
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
    email: '',
    password: '',
  });

  const submitHandler = async () => {
    let isInvalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof ILogin].trim() === '') {
        setError(prev => ({...prev, [key]: true}));
        isInvalid = true;
      } else {
        setError(prev => ({...prev, [key]: false}));
      }
    });
    if (isInvalid) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
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
      style={[styles.safeArea, {backgroundColor: themeColors.white as string}]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        style={styles.keyboard}>
        <View style={styles.brandBlock}>
          <Image
            source={OtherIcons.Logo as ImageSourcePropType}
            style={styles.logo}
          />
          <Text style={[styles.title, {color: themeColors.black as string}]}>
            Welcome back
          </Text>
          <Text
            style={[
              styles.subtitle,
              {color: hexToRGBA(themeColors.black as string, 0.64)},
            ]}>
            Sign in to manage bookings, services, and saved salons.
          </Text>
        </View>

        <View style={styles.form}>
          {Object.keys(inputValue).map(key => (
            <View key={key} style={styles.field}>
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
              <View style={styles.inputWrap}>
                <TextInput
                  value={inputValue[key as keyof ILogin]}
                  onChangeText={text => {
                    setInputValue({...inputValue, [key]: text});
                    setError({...error, [key]: false});
                  }}
                  placeholder={`Enter your ${key}`}
                  secureTextEntry={key === 'password' ? passShow : false}
                  keyboardType={key === 'email' ? 'email-address' : 'default'}
                  autoCapitalize="none"
                  placeholderTextColor={hexToRGBA(
                    themeColors.black as string,
                    0.36,
                  )}
                  style={[
                    globalStyles.input,
                    styles.input,
                    {
                      borderColor: error[key as keyof ILogin]
                        ? (themeColors.red as string)
                        : hexToRGBA(themeColors.black as string, 0.12),
                      backgroundColor: hexToRGBA(
                        themeColors.black as string,
                        0.055,
                      ),
                      color: themeColors.black as string,
                    },
                  ]}
                />
                {key === 'password' && (
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setPassShow(!passShow)}>
                    <Image
                      source={
                        passShow
                          ? (OtherIcons.Eye as ImageSourcePropType)
                          : (OtherIcons.EyeX as ImageSourcePropType)
                      }
                      style={[
                        styles.eyeIcon,
                        {tintColor: themeColors.black as string},
                      ]}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          <Link style={styles.forgotLink} screen="Forget" params={{}}>
            <Text style={{color: themeColors.primary as string}}>
              Forgot password?
            </Text>
          </Link>

          <GradientButton handler={submitHandler} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={themeColors.constWhite as string}
              />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </GradientButton>

          <View style={styles.footerRow}>
            <Text
              style={[
                globalStyles.text,
                {color: hexToRGBA(themeColors.black as string, 0.72)},
              ]}>
              Do not have an account?
            </Text>
            <Link screen="SignUp" params={{}}>
              <Text
                style={[
                  globalStyles.text,
                  styles.footerLink,
                  {color: themeColors.primary as string},
                ]}>
                Sign Up
              </Text>
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 28,
  },
  brandBlock: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    height: 78,
    width: 78,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  form: {
    gap: 4,
  },
  field: {
    marginBottom: 4,
  },
  inputWrap: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    paddingRight: 46,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 17,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
  },
  footerRow: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  footerLink: {
    fontWeight: '800',
  },
});
