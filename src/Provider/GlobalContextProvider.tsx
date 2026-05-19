import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Dimensions, useColorScheme} from 'react-native';
import {useDispatch} from 'react-redux';
import {Colors, ITheme} from '../constant/colors';
import {useGet_profileQuery} from '../Redux/Apis/authApis';
import {setRole, setToken, setUser} from '../Redux/States/userSlice';
import {getLocation} from '../utils/getLocations';
import {IUserProfile} from '../utils/types/Types';
export interface ICord {
  lat: number;
  lng: number;
}
interface GlobalContextType {
  themeColors: ITheme;
  setSearch: (arg1: string) => void;
  search: string;
  width: number;
  height: number;
  profile: IUserProfile | null;
  cord: ICord | null;
  isFilterOpen: boolean;
  openFilter: () => void;
  closeFilter: () => void;
}

interface GlobalProviderProps {
  children: ReactNode;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalContextProvider = ({children}: GlobalProviderProps) => {
  const dispatch = useDispatch();
  const {width, height} = Dimensions.get('window');
  const [search, setSearch] = useState<string>('');
  const themeColors = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
  const {data} = useGet_profileQuery(undefined);
  const [cord, setCord] = useState<ICord | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const values = {
    themeColors,
    setSearch,
    search,
    width,
    height,
    profile: data?.data,
    cord,
    isFilterOpen,
    openFilter: () => setIsFilterOpen(true),
    closeFilter: () => setIsFilterOpen(false),
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
          ]);
        }
      } catch (error) {
        //console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    dispatch(setRole(data?.data?.role));
    dispatch(setUser(data?.data));
  }, [data]);
  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const location = (await getLocation()) as {
          latitude: number;
          longitude: number;
        };
        if (location) {
          setCord({lat: location.latitude, lng: location.longitude});
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentLocation();
  }, []);
  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  return context;
};
export default GlobalContextProvider;
