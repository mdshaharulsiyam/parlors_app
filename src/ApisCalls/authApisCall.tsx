import Toast from 'react-native-toast-message'
import { useChange_passwordMutation, useForgetMutation, useLoginMutation, useRegisterMutation, useResetMutation, useVerify_otpMutation } from '../Redux/Apis/authApis'

const useSignup = () => {
  const [signup, { isLoading }] = useRegisterMutation()
  const register = (data: any, handler?: () => void) => {
    signup(data)
      .unwrap()
      .then((res) => {
        console.log(res, 'res')
        Toast.show({
          type: 'success',
          text1: 'Sign up successfully',
          text2: res?.message || 'Welcome to our app!',
        })
        handler?.()
      })
      .catch((err) => {
        console.log(err, 'err')
        Toast.show({
          type: 'error',
          text1: 'Sign up failed',
          text2: err?.data?.message || 'An error occurred',
        })
      })
  }
  return { register, isLoading }
}
export const useLogin = () => {
  const [login, { isLoading }] = useLoginMutation()
  const submitHandler = (data: any, handler?: () => void) => {
    login(data)
      .unwrap()
      .then((res) => {
        console.log(res, 'res')
        Toast.show({
          type: 'success',
          text1: 'Login successfully',
          text2: res?.message || 'Welcome back!',
        })
        handler?.()
      })
      .catch((err) => {
        console.log(err, 'err')
        Toast.show({
          type: 'error',
          text1: 'Login failed',
          text2: err?.data?.message || 'An error occurred',
        })
      })
  }
  return { login, isLoading }
}
export const useVerifyOtp = () => {
  const [verify, { isLoading }] = useVerify_otpMutation()
  const verifyOtp = (data: any, handler?: () => void) => {
    verify(data)
      .unwrap()
      .then((res) => {
        console.log(res, 'res')
        Toast.show({
          type: 'success',
          text1: 'Otp verified successfully',
          text2: res?.message || 'Otp verified successfully!',
        })
        handler?.()
      })
      .catch((err) => {
        console.log(err, 'err')
        Toast.show({
          type: 'error',
          text1: 'Otp verification failed',
          text2: err?.data?.message || 'An error occurred',
        })
      })
  }
  return { verifyOtp, isLoading }
}
export const useForgetPassword = () => {
  const [forgetPassword, { isLoading }] = useForgetMutation()
  const submitHandler = (data: any, handler?: () => void) => {
    forgetPassword(data)
      .unwrap()
      .then((res) => {
        console.log(res, 'res')
        Toast.show({
          type: 'success',
          text1: 'Forget password successfully',
          text2: res?.message || 'Forget password successfully!',
        })
        handler?.()
      })
      .catch((err) => {
        console.log(err, 'err')
        Toast.show({
          type: 'error',
          text1: 'Forget password failed',
          text2: err?.data?.message || 'An error occurred',
        })
      })
  }
  return { forgetPassword, isLoading }
}
export const useResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetMutation()
  const submitHandler = (data: any, handler?: () => void) => {
    resetPassword(data)
      .unwrap()
      .then((res) => {
        console.log(res, 'res')
        Toast.show({
          type: 'success',
          text1: 'Reset password successfully',
          text2: res?.message || 'Reset password successfully!',
        })
        handler?.()
      })
      .catch((err) => {
        console.log(err, 'err')
        Toast.show({
          type: 'error',
          text1: 'Reset password failed',
          text2: err?.data?.message || 'An error occurred',
        })
      })
  }
  return { resetPassword, isLoading }
}
export const useChangePassword = () => {
  const [changePassword, { isLoading }] = useChange_passwordMutation()
  const submitHandler = (data: any, handler?: () => void) => {
    changePassword(data)
      .unwrap()
      .then((res) => {
        console.log(res, 'res')
        Toast.show({
          type: 'success',
          text1: 'Change password successfully',
          text2: res?.message || 'Change password successfully!',
        })
        handler?.()
      })
      .catch((err) => {
        console.log(err, 'err')
        Toast.show({
          type: 'error',
          text1: 'Change password failed',
          text2: err?.data?.message || 'An error occurred',
        })
      })
  }
  return { changePassword, isLoading }
}
export default useSignup
