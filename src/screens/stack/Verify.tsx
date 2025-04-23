import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {useVerify_otpMutation} from '../../Redux/Apis/authApis';
import {hexToRGBA} from '../../utils/hexToRGBA';

const Verify = () => {
  const [verify, {isLoading}] = useVerify_otpMutation();
  const {themeColors} = useGlobalContext();
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Refs for the 6 input fields
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    const updatedCode = [...verificationCode];
    updatedCode[index] = text;
    setVerificationCode(updatedCode);

    if (text && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleVerification = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit verification code');
      setSuccessMessage('');
      return;
    }
    const email = await AsyncStorage.getItem('email');

    setError('');
    verify({code, email})
      .unwrap()
      .then(async res => {
        if (res?.success) {
          await AsyncStorage.removeItem('email');
          await AsyncStorage.setItem(
            'password_reset_token',
            res?.password_reset_token,
          );
          Toast.show({
            type: 'success',
            text1: 'Email Verified',
            text2: res?.message ?? 'email verified successfully',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Email Verification failed',
            text2: res?.message ?? 'something went wrong',
          });
        }
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Email Verification failed',
          text2: err?.data?.message ?? 'something went wrong',
        });
      });
    // setSuccessMessage("Your email has been verified successfully!");
  };

  // Handle Back Button press

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: themeColors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Back Button */}
        <TouchableOpacity>
          <Text style={[styles.backButton, {color: themeColors.text}]}>
            Back
          </Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={[styles.title, {color: themeColors.text}]}>
          Verify Your Email
        </Text>

        {/* Verification Message */}
        <Text style={[styles.message, {color: themeColors.text}]}>
          A verification code has been sent to your email. Please enter the
          6-digit code below to verify your account.
        </Text>

        {/* Verification Code Input */}
        <View style={styles.inputContainer}>
          {verificationCode.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={[
                styles.input,
                {
                  backgroundColor: themeColors.background2,
                  color: themeColors.text,
                  borderColor: themeColors.text,
                },
              ]}
              placeholder="-"
              placeholderTextColor={hexToRGBA(themeColors.text, 0.2)}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Error Message */}
        {error ? (
          <Text style={[styles.errorText, {color: themeColors.red}]}>
            {error}
          </Text>
        ) : null}

        {/* Success Message */}
        {successMessage ? (
          <Text style={[styles.successText, {color: themeColors.icon}]}>
            {successMessage}
          </Text>
        ) : null}

        {/* Verify Button */}
        <TouchableOpacity
          disabled={isLoading}
          style={[styles.button, {backgroundColor: themeColors.icon}]}
          onPress={handleVerification}>
          {isLoading ? (
            <ActivityIndicator size="large" color={themeColors.icon} />
          ) : (
            <Text style={[styles.buttonText, {color: themeColors.white}]}>
              Verify Email
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
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
