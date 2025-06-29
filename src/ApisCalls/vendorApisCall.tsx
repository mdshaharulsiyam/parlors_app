import moment from 'moment'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { useCreateVendorMutation } from '../Redux/Apis/vendorApis'
import { SelectedTime } from '../components/ManageShop/AvailableTme'

export const useCreateVendor = () => {
  const [createVendor, { isLoading }] = useCreateVendorMutation()
  const { profile, address } = useSelector((state: any) => state?.vendor)
  let timeFormate: { [key: string]: string[] } = {
    friday: [],
    saturday: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
  }
  const createVendorHandler = (availableTime: SelectedTime, coordinates: number[], handler?: () => void) => {
    Object.entries(availableTime).map(([day, time]) => {
      if (!time.checked) {
        timeFormate[day as keyof SelectedTime] = []
      } else {
        timeFormate[day as keyof SelectedTime] = [moment(time.from).format('HH:mm A'), moment(time.to).format('HH:mm A')]
      }
    })
    const data = {
      profile,
      address,
      availableTime: timeFormate,
      coordinates: JSON.stringify(coordinates),
    }

    createVendor(data)
      .unwrap()
      .then((res) => {
        Toast.show({
          type: 'success',
          text1: 'Vendor created successfully',
          text2: res?.message || 'Vendor created successfully',
        })
        handler?.()
      })
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1: 'Vendor creation failed',
          text2: err?.data?.message || 'An error occurred',
        })
      })
  }
  return { createVendorHandler, isLoading }
}