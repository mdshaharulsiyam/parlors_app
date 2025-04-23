import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
interface GoogleSignInResponse {
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
import Toast from 'react-native-toast-message';
import {TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {useGet_profileQuery, useLoginMutation} from '../../Redux/Apis/authApis';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {hexToRGBA} from '../../utils/hexToRGBA';
const SignIn = () => {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const signIn = async () => {
    try {
      //   await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response);
      if (response) {
      } else {
        // sign in was cancelled by user
      }
    } catch (error: any) {
      console.log(error);
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
  const {refetch} = useGet_profileQuery(undefined);
  const {themeColors} = useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [login, {isLoading}] = useLoginMutation();
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    if (password !== password) {
      setError('Passwords do not match!');
      return;
    }

    setError('');
    login({email, password})
      .unwrap()
      .then(async res => {
        if (res?.success) {
          await AsyncStorage.setItem('token', res?.token);
          Toast.show({
            type: 'success',
            text1: 'Logged In',
            text2: res?.message ?? 'Logged in successfully',
          });
          refetch();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Log In Failed',
            text2: res?.message ?? 'something went wrong',
          });
        }
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Log In Failed',
          text2: err?.data?.message ?? 'something went wrong',
        });
      });
  };
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: themeColors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Title */}
        <Text style={[styles.title, {color: themeColors.text}]}>Login</Text>

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
          placeholder="Email"
          placeholderTextColor={hexToRGBA(themeColors.text, 0.2)}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input with Show/Hide Feature */}
        <View
          style={[
            styles.passwordContainer,
            {
              backgroundColor: themeColors.background2,
              borderColor: themeColors.text,
            },
          ]}>
          <TextInput
            style={[styles.passwordInput, {color: themeColors.text}]}
            placeholder="Password"
            placeholderTextColor={hexToRGBA(themeColors.text, 0.2)}
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Text style={[styles.eyeIcon, {color: themeColors.icon}]}>
              {isPasswordVisible ? '🙉' : '🙈'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => {}}
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            width: '100%',
          }}>
          <Text
            style={[
              styles.forgotPassword,
              {color: hexToRGBA(themeColors.red, 0.8)},
            ]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          style={[styles.button, {backgroundColor: themeColors.icon2}]}>
          {isLoading ? (
            <ActivityIndicator size="large" color={themeColors.icon} />
          ) : (
            <Text style={[styles.buttonText, {color: themeColors.white}]}>
              Login
            </Text>
          )}
        </TouchableOpacity>
        {error ? (
          <Text style={[styles.errorText, {color: themeColors.red}]}>
            {error}
          </Text>
        ) : null}
        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={{color: themeColors.text}}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.signupText, {color: themeColors.icon}]}>
              {' '}
              Sign Up
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

export default SignIn;
/*
  <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      <GoogleSigninButton
        onPress={signIn}
        disabled={isSigninInProgress}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
      />
    </View>
*/
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
