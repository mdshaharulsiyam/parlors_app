import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';
import { hexToRGBA } from '../../utils/hexToRGBA';

const GradientButton = ({
  children,
  handler,
}: {
  children: React.ReactNode;
  handler?: () => void;
}) => {
  const { themeColors } = useGlobalContext();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        handler && handler();
      }}>
      <LinearGradient
        colors={[
          hexToRGBA(themeColors.primary as string, 1),
          hexToRGBA(themeColors.secondary as string, 0.5),
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 15, borderRadius: 10 }}>
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({});
