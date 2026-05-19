import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useGlobalContext} from '../../Provider/GlobalContextProvider';
import {hexToRGBA} from '../../utils/hexToRGBA';

const GradientButton = ({
  children,
  handler,
  padding = 14,
  borderWidth = 0,
  disabled = false,
  style,
}: {
  children: React.ReactNode;
  handler?: () => void;
  padding?: number;
  borderWidth?: number;
  disabled?: boolean;
  style?: ViewStyle;
}) => {
  const {themeColors} = useGlobalContext();
  const primary = themeColors.primary as string;
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      disabled={disabled}
      onPress={() => {
        if (!disabled) {
          handler?.();
        }
      }}
      style={[
        styles.touchable,
        {
          borderColor: primary,
          borderWidth,
          opacity: disabled ? 0.65 : 1,
        },
        style,
      ]}>
      <LinearGradient
        colors={[
          hexToRGBA(primary, 1),
          hexToRGBA(primary, 0.82),
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.gradient, {padding}]}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradient: {
    borderRadius: 8,
  },
});
