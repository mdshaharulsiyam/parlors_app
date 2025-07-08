import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';
import FilterOptions from '../components/Shared/FilterOptions';
import { Colors, ITheme } from '../constant/colors';
import { useGet_profileQuery } from '../Redux/Apis/authApis';
import { setRole, setToken, setUser } from '../Redux/States/userSlice';
import { IUserProfile } from '../utils/types/Types';

interface GlobalContextType {
  themeColors: ITheme;
  setSearch: (arg1: string) => void;
  search: string;
  width: number;
  height: number;
  profile: IUserProfile | null;
  bottomSheetRef: React.RefObject<BottomSheet | null>;
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
  const themeColors = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
  const { data } = useGet_profileQuery(undefined)
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const values = {
    themeColors,
    setSearch,
    search,
    width,
    height,
    profile: data?.data,
    bottomSheetRef
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const [role, token] = await Promise.all([
          AsyncStorage.getItem('role'),
          AsyncStorage.getItem('token'),
        ]);
        if (role && token) {
          await Promise.all([
            dispatch(setRole(JSON.parse(role))),
            dispatch(setToken(JSON.parse(token))),
            dispatch(setUser(data?.data)),
          ])
        }
      } catch (error) {
        //console.log(error);
      }
    }
    getData()
  }, [])

  useEffect(() => {
    dispatch(setRole(data?.data?.role))
    dispatch(setUser(data?.data))
  }, [data])

  return (
    <GlobalContext.Provider value={values}>
      {children}

      <BottomSheet
        index={-1}
        snapPoints={['25%', '50%', '90%']}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
      >
        <BottomSheetView>
          <FilterOptions />
        </BottomSheetView>
      </BottomSheet>
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
