import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useForgetPassword} from '../../ApisCalls/authApisCall';
import GradientButton from '../../components/Shared/GradientButton';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';
import {ScreenParamsType} from '../../utils/types/ScreenParamsType';

const Forget = () => {
  const navigation = useNavigation<StackNavigationProp<ScreenParamsType>>();
  const {themeColors} = useGlobalContext();
  const [email, setEmail] = useState('');
  const {ForgetSubmitHandler, isLoading} = useForgetPassword();
  const handleSendVerificationEmail = () => {
    if (!email.trim()) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter your email',
      });
    }

    ForgetSubmitHandler({email}, () => {
      navigation.navigate('Verify', {from: 'forget', email});
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: themeColors.white as string}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.title, {color: themeColors.black as string}]}>
            Forgot password
          </Text>
          <Text
            style={[
              styles.subtitle,
              {color: hexToRGBA(themeColors.black as string, 0.64)},
            ]}>
            We will send a verification code to your email.
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: hexToRGBA(themeColors.black as string, 0.055),
                color: themeColors.black as string,
                borderColor: hexToRGBA(themeColors.black as string, 0.12),
              },
            ]}
            placeholder="Enter your email"
            placeholderTextColor={hexToRGBA(themeColors.black as string, 0.36)}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <GradientButton
            handler={handleSendVerificationEmail}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={themeColors.constWhite as string}
              />
            ) : (
              <Text style={styles.buttonText}>Send Verification Email</Text>
            )}
          </GradientButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Forget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 22,
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
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 54,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 18,
    fontSize: 15,
    borderWidth: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
  },
});
