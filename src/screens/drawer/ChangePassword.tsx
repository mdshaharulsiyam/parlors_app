import React from 'react';

import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IChangePassword } from '../../../types/loginType';
import GradientButton from '../../components/Shared/GradientButton';
import { OtherIcons } from '../../constant/images';
import { globalStyles } from '../../constant/styles';
import { useGlobalContext } from '../../Provider/GlobalContextProvider';

const ChangePassword = () => {
  const { themeColors, height } = useGlobalContext();
  const [passShow, setPassShow] = React.useState(true);
  const [opassShow, setOPassShow] = React.useState(true);
  const [cPassShow, setCPassShow] = React.useState(true);
  const [countryCode, setCountryCode] = React.useState('BD');
  const [callingCode, setCallingCode] = React.useState('880');
  const { width } = Dimensions.get('window');



  const [error, setError] = React.useState({
    'current password': false,
    'new password': false,
    'confirm password': false,
  });

  const [inputValue, setInputValue] = React.useState<IChangePassword>({
    'current password': '123456',
    'new password': '123456',
    'confirm password': '123456',
  });

  const submitHandler = () => {
    Object.keys(inputValue).forEach(key => {
      if (inputValue[key as keyof IChangePassword] === '') {
        setError(prev => ({ ...prev, [key]: true }));
      } else {
        setError(prev => ({ ...prev, [key]: false }));
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        position: 'relative',
        height: height,
      }}>
      <ScrollView
        style={{
          width: '100%',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        {Object.keys(inputValue).map((key, index, arr) => {
          return (
            <View key={key} style={{}}>
              <Text style={globalStyles.inputLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={inputValue[key as keyof IChangePassword]}
                  onChangeText={text => {
                    setInputValue({ ...inputValue, [key]: text });
                    setError({ ...error, [key]: false });
                  }}
                  placeholder={`Enter your ${key}`}
                  secureTextEntry={
                    key === 'new password'
                      ? passShow
                      : key === 'confirm password'
                        ? cPassShow
                        : opassShow
                  }
                  placeholderTextColor={globalStyles.inputPlaceholder.color}
                  style={[
                    globalStyles.input,
                    error[key as keyof IChangePassword]
                      ? globalStyles.inputError
                      : {},
                  ]}
                />
                {(key === 'new password' ||
                  key === 'confirm password' ||
                  key === 'current password') && (
                    <TouchableOpacity
                      style={{ position: 'absolute', right: 10, top: 18 }}
                      onPress={() => {
                        if (key === 'new password') {
                          setPassShow(!passShow);
                        } else if (key === 'confirm password') {
                          setCPassShow(!cPassShow);
                        } else {
                          setOPassShow(!opassShow);
                        }
                      }}>
                      <Image
                        source={
                          key === 'new password'
                            ? passShow
                              ? (OtherIcons.Eye as ImageSourcePropType)
                              : (OtherIcons.EyeX as ImageSourcePropType)
                            : cPassShow
                              ? (OtherIcons.Eye as ImageSourcePropType)
                              : (OtherIcons.EyeX as ImageSourcePropType)
                        }
                        style={{ width: 20, height: 20 }}
                      />
                    </TouchableOpacity>
                  )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: 25,
          position: 'absolute',
          bottom: 100,
          width: width,
          paddingVertical: 16,
        }}>
        <GradientButton handler={submitHandler}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 18,
            }}>
            Save Changes
          </Text>
        </GradientButton>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
