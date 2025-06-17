import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { useResetMutation } from '../../Redux/Apis/authApis';
import { hexToRGBA } from '../../utils/hexToRGBA';
const Reset = () => {
  const { themeColors } = useGlobalContext();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [reset, { isLoading }] = useResetMutation();
  const handleResetPassword = async () => {
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setSuccessMessage('');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setSuccessMessage('');
      return;
    }
    const token = await AsyncStorage.getItem('password_reset_token');
    const data = {
      password: newPassword,
      confirm_password: confirmPassword,
    };
    reset({ data, token })
      .unwrap()
      .then(async res => {
        if (res?.success) {
          await AsyncStorage.removeItem('password_reset_token');
          Toast.show({
            type: 'success',
            text1: 'Password Reseated',
            text2: res?.message ?? 'Password Reseated successfully',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Password Reseated failed',
            text2: res?.message ?? 'something went wrong',
          });
        }
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Password Reseated failed',
          text2: err?.data?.message ?? 'something went wrong',
        });
      });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Title */}
        <Text style={[styles.title, { color: themeColors.black as string }]}>
          Reset Password
        </Text>

        {/* Instructions */}
        <Text style={[styles.message, { color: themeColors.black as string }]}>
          Please enter your new password and confirm it.
        </Text>

        {/* New Password Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: themeColors.white as string,
                color: themeColors.black as string,
                borderColor: themeColors.black as string,
              },
            ]}
            placeholder="New Password"
            placeholderTextColor={hexToRGBA(themeColors.black as string, 0.2)}
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowNewPassword(!showNewPassword)}>
            <Text style={[styles.eyeIcon, { color: themeColors.green as string }]}>
              {showNewPassword ? '🙉' : '🙈'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: themeColors.white as string,
                color: themeColors.black as string,
                borderColor: themeColors.black as string,
              },
            ]}
            placeholder="Confirm Password"
            placeholderTextColor={hexToRGBA(themeColors.black as string, 0.2)}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text style={[styles.eyeIcon, { color: themeColors.green as string }]}>
              {showConfirmPassword ? '🙉' : '🙈'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {error ? (
          <Text style={[styles.errorText, { color: themeColors.red }]}>
            {error}
          </Text>
        ) : null}

        {/* Success Message */}
        {successMessage ? (
          <Text style={[styles.successText, { color: themeColors.green as string }]}>
            {successMessage}
          </Text>
        ) : null}

        {/* Reset Password Button */}
        <TouchableOpacity
          disabled={isLoading}
          style={[styles.button, { backgroundColor: themeColors.green as string }]}
          onPress={handleResetPassword}>
          {isLoading ? (
            <ActivityIndicator size="large" color={themeColors.green as string} />
          ) : (
            <Text style={[styles.buttonText, { color: themeColors.white as string }]}>
              Reset Password
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
  },
  eyeIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 12,
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

export default Reset;
