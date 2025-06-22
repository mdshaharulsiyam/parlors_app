import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useVerifyOtp } from '../../ApisCalls/authApisCall';
import GradientButton from '../../components/Shared/GradientButton';
import { OtherIcons } from '../../constant/images';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { ScreenParamsType } from '../../utils/types/ScreenParamsType';

const Verify = () => {
  const route = useRoute();
  const params = route?.params as { from: string; email: string };
  const from = params?.from;
  const email = params?.email;
  const navigate = useNavigation<NavigationProp<ScreenParamsType>>();
  const { themeColors } = useGlobalContext();
  const [code, setCode] = useState('')
  const { verifyOtp, isLoading } = useVerifyOtp()
  const handleOtpChange = useCallback(() => {
    if (code?.length != 6) {
      return Toast.show({
        type: 'error',
        text1: "Invalid OTP",
        text2: "Please enter a valid 6-digit OTP.",
      });
    };
    verifyOtp({ code, email }, () => from == "signup" ? navigate.navigate('Login') : navigate.navigate('Reset'))

  }, [code, from, email])


  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: hexToRGBA(themeColors.white as string, .95) }}>
      <View>
        <Image source={OtherIcons.Logo as ImageSourcePropType} style={{
          height: 100,
          width: 100,
        }} />
      </View>
      {/* form */}
      <View style={{ width: '90%', paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 500,
            textAlign: 'center',
            marginVertical: 20,

            color: themeColors.primary as string,
          }}>
          Enter the code sent to
        </Text>
        <OtpInput
          numberOfDigits={6}
          focusColor="green"
          autoFocus={false}
          hideStick={true}
          placeholder="******"
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          // onFocus={() => console.log('Focused')}
          // onBlur={() => console.log('Blurred')}
          // onTextChange={text => console.log(text)}
          onFilled={text => setCode(text)}
          textInputProps={{
            accessibilityLabel: 'One-Time Password',
          }}
          textProps={{
            accessibilityRole: 'text',
            accessibilityLabel: 'OTP digit',
            allowFontScaling: false,
          }}
          theme={{
            pinCodeContainerStyle: {
              backgroundColor: hexToRGBA(themeColors.primary as string, 0.2),
            },
            pinCodeTextStyle: {
              color: hexToRGBA(themeColors.primary as string, 1),
              fontWeight: 700,
            },
          }}
        />

        <View
          style={{
            paddingHorizontal: 25,
            marginTop: 40,
          }}>
          <GradientButton
            handler={handleOtpChange}>
            {
              isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: 18,
                }}>
                Submit
              </Text>
            }

          </GradientButton>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    fontSize: 16,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    width: '13%',
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
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
  errorText: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  successText: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
});
