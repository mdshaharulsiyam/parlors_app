import {useColorScheme} from 'react-native';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Colors, ITheme} from '../constant/colors';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

interface GlobalContextType {
  themeColors: ITheme;
  setSearch: (arg1: string) => void;
  search: string;
  setModalOpen: (arg1: boolean) => void;
  modalOpen: boolean;
}

interface GlobalProviderProps {
  children: ReactNode;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextProvider = ({children}: GlobalProviderProps) => {
  GoogleSignin.configure({
    webClientId:
      '785669277913-sk3g9jodma9o3danl96a7g13kt4grenq.apps.googleusercontent.com', // Replace with your webClientId
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    forceCodeForRefreshToken: false,
  });
  const colorScheme = useColorScheme();
  const [search, setSearch] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const themeColors = Colors.light;
  const values = {
    themeColors,
    setSearch,
    search,
    setModalOpen,
    modalOpen,
  };
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
