import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Dimensions, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { Colors, ITheme } from '../constant/colors';
import { store } from '../Redux/store';

interface GlobalContextType {
  themeColors: ITheme;
  setSearch: (arg1: string) => void;
  search: string;
  setModalOpen: (arg1: boolean) => void;
  modalOpen: boolean;
  width: number;
  height: number
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
  const { width, height } = Dimensions.get('window');
  const [search, setSearch] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const themeColors = useColorScheme() !== 'dark' ? Colors.dark : Colors.light;
  const values = {
    themeColors,
    setSearch,
    search,
    setModalOpen,
    modalOpen,
    width,
    height
  };
  return (
    <GlobalContext.Provider value={values}>
      <Provider store={store}>{children}</Provider>
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
