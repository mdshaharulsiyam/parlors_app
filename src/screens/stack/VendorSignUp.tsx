import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../Provider/GlobalContextProvider'
import { hexToRGBA } from '../../utils/hexToRGBA'

const VendorSignUp = () => {
  const { themeColors } = useGlobalContext()
  return (
    <SafeAreaView
      style={{ backgroundColor: hexToRGBA(themeColors.white as string, .95) }}
    >
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 20,
          paddingVertical: 20,
          marginTop: 40,
          zIndex: 1
        }}>

      </ScrollView>
    </SafeAreaView>
  )
}

export default VendorSignUp

const styles = StyleSheet.create({})