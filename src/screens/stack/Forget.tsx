import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {useForgetMutation} from '../../Redux/Apis/authApis';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';

const Forget = () => {
  const {themeColors} = useGlobalContext();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [forget, {isLoading}] = useForgetMutation();
  const handleSendVerificationEmail = () => {
    if (!email) {
      setError('Please enter your email');
      setSuccessMessage('');
      return;
    }
    setError('');
    forget({email})
      .unwrap()
      .then(async res => {
        if (res?.success) {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.setItem('email', email);
          Toast.show({
            type: 'success',
            text1: 'Check your email',
            text2: res?.message ?? 'verification mail sent to your mail',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Failed so sent mail',
            text2: res?.message ?? 'something went wrong',
          });
        }
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Failed so sent mail',
          text2: err?.data?.message ?? 'something went wrong',
        });
      });
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: themeColors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Title */}
        <Text style={[styles.title, {color: themeColors.text}]}>
          Forgot Password
        </Text>

        {/* Email Input */}
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeColors.background2,
              color: themeColors.text,
              borderColor: themeColors.text,
            },
          ]}
          placeholder="Enter your email"
          placeholderTextColor={hexToRGBA(themeColors.text, 0.2)}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

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

        {/* Send Verification Email Button */}
        <TouchableOpacity
          disabled={isLoading}
          style={[styles.button, {backgroundColor: themeColors.icon}]}
          onPress={handleSendVerificationEmail}>
          {isLoading ? (
            <ActivityIndicator size="large" color={themeColors.icon} />
          ) : (
            <Text style={[styles.buttonText, {color: themeColors.white}]}>
              Send Verification Email
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forget;

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
