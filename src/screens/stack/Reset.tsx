import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {INewPassword} from '../../../types/loginType';
import {useResetPassword} from '../../ApisCalls/authApisCall';
import GradientButton from '../../components/Shared/GradientButton';
import {OtherIcons} from '../../constant/images';
import {globalStyles} from '../../constant/styles';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {setResetToken} from '../../Redux/States/userSlice';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {ScreenParamsType} from '../../utils/types/ScreenParamsType';

const Reset = () => {
  const navigate = useNavigation<NavigationProp<ScreenParamsType>>();
  const [passShow, setPassShow] = React.useState(true);
  const [cPassShow, setCPassShow] = React.useState(true);
  const {themeColors} = useGlobalContext();
  const [error, setError] = React.useState({
    password: false,
    confirmPassword: false,
  });
  const [inputValue, setInputValue] = React.useState<INewPassword>({
    password: '',
    confirmPassword: '',
  });
  const {submitHandler: resetPassword, isLoading: resetLoading} =
    useResetPassword();
  const dispatch = useDispatch();

  const submitHandler = () => {
    let invalid = false;
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof INewPassword].trim() === '') {
        setError(prev => ({...prev, [key]: true}));
        invalid = true;
      } else {
        setError(prev => ({...prev, [key]: false}));
      }
    });
    if (invalid) {
      Toast.show({
        type: 'error',
        text1: 'Reset password failed',
        text2: 'Please fill all fields',
      });
      return;
    }
    const data = {
      password: inputValue.password,
      confirm_password: inputValue.confirmPassword,
    };
    resetPassword(data, () => {
      dispatch(setResetToken(''));
      navigate.navigate('Stacks', {screen: 'SignIn'});
    });
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: themeColors.white as string}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}>
          <Image
            source={OtherIcons.Logo as ImageSourcePropType}
            style={styles.logo}
          />
          <Text style={[styles.title, {color: themeColors.black as string}]}>
            Create a new password
          </Text>
          <Text
            style={[
              styles.subtitle,
              {color: hexToRGBA(themeColors.black as string, 0.64)},
            ]}>
            Use a secure password you have not used here before.
          </Text>

          <View style={styles.form}>
            {Object.keys(inputValue).map(key => (
              <View key={key} style={styles.field}>
                <Text
                  style={[
                    globalStyles.inputLabel,
                    {
                      color: error[key as keyof INewPassword]
                        ? (themeColors.red as string)
                        : (themeColors.black as string),
                    },
                  ]}>
                  {key === 'confirmPassword' ? 'Confirm password' : 'Password'}
                </Text>
                <View style={styles.inputWrap}>
                  <TextInput
                    value={inputValue[key as keyof INewPassword]}
                    onChangeText={text => {
                      setInputValue({...inputValue, [key]: text});
                      setError({...error, [key]: false});
                    }}
                    placeholder={
                      key === 'confirmPassword'
                        ? 'Confirm your password'
                        : 'Enter new password'
                    }
                    secureTextEntry={
                      key === 'password' ? passShow : cPassShow
                    }
                    placeholderTextColor={hexToRGBA(
                      themeColors.black as string,
                      0.4,
                    )}
                    style={[
                      globalStyles.input,
                      styles.input,
                      {
                        borderColor: error[key as keyof INewPassword]
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
                  <TouchableOpacity
                    style={styles.eyeButton}
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
                      style={[
                        styles.eyeIcon,
                        {tintColor: themeColors.black as string},
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <GradientButton handler={submitHandler} disabled={resetLoading}>
              {resetLoading ? (
                <ActivityIndicator
                  size="small"
                  color={themeColors.constWhite as string}
                />
              ) : (
                <Text style={styles.buttonText}>Save Password</Text>
              )}
            </GradientButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Reset;

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
  logo: {
    alignSelf: 'center',
    height: 78,
    width: 78,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 26,
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
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
  },
});
