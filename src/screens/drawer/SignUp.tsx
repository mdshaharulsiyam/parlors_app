import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { useRegisterMutation } from '../../Redux/Apis/authApis';
import { hexToRGBA } from '../../utils/hexToRGBA';
import { signIn } from './SignIn';

const SignUp = () => {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const { themeColors } = useGlobalContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = () => {
    setError('');
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setError('');
    register({ name, email, phone, password, confirmPassword })
      .unwrap()
      .then(res => {
        if (res?.success) {
          Toast.show({
            type: 'success',
            text1: 'Registered',
            text2: res?.message ?? 'verification mail sent to your mail',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Registered Failed',
            text2: res?.message ?? 'something went wrong',
          });
        }
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Registered Failed',
          text2: err?.data?.message ?? 'something went wrong',
        });
      });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Title */}
        <Text style={[styles.title, { color: themeColors.black as string }]}>Sign Up</Text>

        {/* Name Input */}
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeColors.white as string,
              color: themeColors.black as string,
              borderColor: themeColors.black as string,
            },
          ]}
          placeholder="Full Name"
          placeholderTextColor={hexToRGBA(themeColors.black as string, 0.2)}
          value={name}
          onChangeText={setName}
        />

        {/* Email Input */}
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeColors.white as string,
              color: themeColors.black as string,
              borderColor: themeColors.black as string,
            },
          ]}
          placeholder="Email"
          placeholderTextColor={hexToRGBA(themeColors.black as string, 0.2)}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Phone Input */}
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeColors.white as string,
              color: themeColors.black as string,
              borderColor: themeColors.black as string,
            },
          ]}
          placeholder="Phone Number"
          placeholderTextColor={hexToRGBA(themeColors.black as string, 0.2)}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: themeColors.white as string,
                color: themeColors.black as string,
                borderColor: themeColors.black as string,
                paddingRight: 40, // Adds space on the right side for the icon
              },
            ]}
            placeholder="Password"
            placeholderTextColor={hexToRGBA(themeColors.black as string, 0.2)}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.toggleVisibility}
            onPress={() => setIsPasswordVisible(prev => !prev)}>
            <Text style={{ color: themeColors.black as string }}>
              {isPasswordVisible ? '🙉' : '🙈'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: themeColors.white as string,
                color: themeColors.black as string,
                borderColor: themeColors.black as string,
                paddingRight: 40, // Adds space on the right side for the icon
              },
            ]}
            placeholder="Confirm Password"
            placeholderTextColor={hexToRGBA(themeColors.black as string, 0.2)}
            secureTextEntry={!isConfirmPasswordVisible} // Same here, toggle visibility
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.toggleVisibility}
            onPress={() => setIsConfirmPasswordVisible(prev => !prev)}>
            <Text style={{ color: themeColors.black as string }}>
              {isConfirmPasswordVisible ? '🙉' : '🙈'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {error ? (
          <Text style={[styles.errorText, { color: themeColors.red }]}>
            {error}
          </Text>
        ) : null}

        {/* Sign Up Button */}
        <TouchableOpacity
          disabled={isLoading}
          style={[styles.button, { backgroundColor: themeColors.green as string }]}
          onPress={handleRegister}>
          {isLoading ? (
            <ActivityIndicator size="large" color={themeColors.green as string} />
          ) : (
            <Text style={[styles.buttonText, { color: themeColors.white as string }]}>
              Sign Up
            </Text>
          )}
        </TouchableOpacity>

        {/* Existing User? Login */}
        <View style={styles.signupContainer}>
          <Text style={{ color: themeColors.black as string }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => { }}>
            <Text style={[styles.signupText, { color: themeColors.green as string }]}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
          }}>
          <GoogleSigninButton
            onPress={signIn}
            disabled={isSigninInProgress}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleVisibility: {
    position: 'absolute',
    right: 15,
    padding: 5,
    top: 7,
  },
});

export default SignUp;
