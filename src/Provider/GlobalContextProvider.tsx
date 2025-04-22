import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Colors, ITheme} from '../constant/colors';
import {SafeAreaView} from 'react-native-safe-area-context';

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
