import Toast from 'react-native-toast-message'
import { useRegisterMutation } from '../Redux/Apis/authApis'

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
export default useSignup
