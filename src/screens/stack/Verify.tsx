import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {useVerifyOtp} from '../../ApisCalls/authApisCall';
import GradientButton from '../../components/Shared/GradientButton';
import {OtherIcons} from '../../constant/images';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {setResetToken} from '../../Redux/States/userSlice';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {ScreenParamsType} from '../../utils/types/ScreenParamsType';

const Verify = () => {
  const route = useRoute();
  const params = route?.params as {from: 'signup' | 'forget'; email: string};
  const from = params?.from;
  const email = params?.email;
  const navigate = useNavigation<NavigationProp<ScreenParamsType>>();
  const {themeColors} = useGlobalContext();
  const [code, setCode] = useState('');
  const {verifyOtp, isLoading} = useVerifyOtp();
  const dispatch = useDispatch();

  const handleOtpChange = useCallback(() => {
    if (code?.length !== 6) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter a valid 6-digit OTP.',
      });
    }
    const storeData = async (token: any) => {
      if (from === 'signup') {
        navigate.navigate('SignIn');
      } else {
        token && dispatch(setResetToken(token));
        navigate.navigate('Reset');
      }
    };
    verifyOtp({code, email}, storeData);
  }, [code, dispatch, email, from, navigate, verifyOtp]);

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: themeColors.white as string}]}>
      <View style={styles.content}>
        <Image
          source={OtherIcons.Logo as ImageSourcePropType}
          style={styles.logo}
        />
        <Text style={[styles.title, {color: themeColors.black as string}]}>
          Verify your email
        </Text>
        <Text
          style={[
            styles.subtitle,
            {color: hexToRGBA(themeColors.black as string, 0.64)},
          ]}>
          Enter the 6 digit code sent to {email || 'your email'}.
        </Text>

        <OtpInput
          numberOfDigits={6}
          focusColor={themeColors.primary as string}
          autoFocus={false}
          hideStick={true}
          placeholder="------"
          blurOnFilled={true}
          disabled={isLoading}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          onTextChange={setCode}
          onFilled={setCode}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
          textProps={{
            accessibilityRole: 'text',
            accessibilityLabel: 'OTP digit',
            allowFontScaling: false,
          }}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: {
              ...styles.pinBox,
              backgroundColor: hexToRGBA(themeColors.primary as string, 0.08),
              borderColor: hexToRGBA(themeColors.primary as string, 0.18),
            },
            pinCodeTextStyle: {
              color: themeColors.primary as string,
              fontWeight: '800',
            },
          }}
        />

        <GradientButton
          handler={handleOtpChange}
          disabled={isLoading}
          style={styles.submitButton}>
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={themeColors.constWhite as string}
            />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </GradientButton>
      </View>
    </SafeAreaView>
  );
};

export default Verify;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logo: {
    alignSelf: 'center',
    height: 82,
    width: 82,
    marginBottom: 18,
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
    marginBottom: 28,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  otpContainer: {
    gap: 8,
  },
  pinBox: {
    width: 46,
    height: 54,
    borderWidth: 1,
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 34,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
  },
});
