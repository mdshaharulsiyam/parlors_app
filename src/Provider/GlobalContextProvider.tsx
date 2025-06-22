import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Dimensions, useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors, ITheme } from '../constant/colors';
import { useGet_profileQuery } from '../Redux/Apis/authApis';
import { setToken } from '../Redux/States/userSlice';
import { IUserProfile } from '../utils/types/Types';

interface GlobalContextType {
  themeColors: ITheme;
  setSearch: (arg1: string) => void;
  search: string;
  setModalOpen: (arg1: boolean) => void;
  modalOpen: boolean;
  width: number;
  height: number;
  role: string;
  setRole: (arg1: string) => void;
  profile: IUserProfile | null;
}

interface GlobalProviderProps {
  children: ReactNode;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalContextProvider = ({ children }: GlobalProviderProps) => {
  GoogleSignin.configure({
    webClientId:
      '785669277913-sk3g9jodma9o3danl96a7g13kt4grenq.apps.googleusercontent.com', // Replace with your webClientId
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    forceCodeForRefreshToken: false,
  });
  const dispatch = useDispatch()
  const { width, height } = Dimensions.get('window');
  const [search, setSearch] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const themeColors = useColorScheme() !== 'dark' ? Colors.dark : Colors.light;
  const [role, setRole] = useState<string>('');
  const { data } = useGet_profileQuery(undefined)
  const values = {
    themeColors,
    setSearch,
    search,
    setModalOpen,
    modalOpen,
    width,
    height,
    role,
    setRole,
    profile: data?.data,
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        const token = await AsyncStorage.getItem('token');
        if (role && token) {
          setRole(role)
          dispatch(setToken(token))
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])
  return (
    <GlobalContext.Provider value={values}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  return context;
};
export default GlobalContextProvider;
