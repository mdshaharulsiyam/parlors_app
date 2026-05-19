import React from 'react';
import {TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';

const GradientButton = ({
  children,
  handler,
  padding = 15,
  borderWidth = 0.5,
}: {
  children: React.ReactNode;
  handler?: () => void;
  padding?: number;
  borderWidth?: number;
}) => {
  const {themeColors} = useGlobalContext();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        handler && handler();
      }}
      style={{
        borderColor: themeColors.primary as string,
        borderRadius: 15,
        borderWidth: borderWidth,
      }}>
      <LinearGradient
        colors={[
          hexToRGBA(themeColors.primary as string, 1),
          hexToRGBA(themeColors.secondary as string, 0.5),
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{padding: padding, borderRadius: 10}}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
