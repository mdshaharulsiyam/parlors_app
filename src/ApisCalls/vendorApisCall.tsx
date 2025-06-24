import { useSelector } from 'react-redux'
import { useCreateVendorMutation } from '../Redux/Apis/vendorApis'

export const useCreateVendor = () => {
  const [createVendor, { isLoading }] = useCreateVendorMutation()
  const { profile, address, availableTime } = useSelector((state: any) => state?.vendor)
  const createVendorHandler = (handler?: () => void) => {
    const data = {
      profile,
      address,
      availableTime
    }
    console.log(data)
    return
    // createVendor(data)
    //   .unwrap()
    //   .then((res) => {
    //     Toast.show({
    //       type: 'success',
    //       text1: 'Vendor created successfully',
    //       text2: res?.message || 'Vendor created successfully',
    //     })
    //     handler?.()
    //   })
    //   .catch((err) => {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Vendor creation failed',
    //       text2: err?.data?.message || 'An error occurred',
    //     })
    //   })
  }
  return { createVendorHandler, isLoading }
}