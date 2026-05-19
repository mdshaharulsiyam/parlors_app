import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {OtherIcons} from '../../constant/images';

interface InputProps extends TextInputProps {
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  placeholder?: string;
  validate?: boolean;
  validationMessage?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  bordersColor?: string;
  inputType?: 'text' | 'password' | 'number' | 'email';
  [key: string]: any;
  handleSubmit?: (arg1?: any) => void;
  setInputValue?: (arg1?: any) => void;
}

const Input: React.FC<InputProps> = ({
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  maxLength = 100,
  placeholder = 'Enter text here',
  style,
  validate = false,
  validationMessage = 'Required field',
  isValid: _isValid = true,
  isInvalid = false,
  errorMessage = 'This field is required',
  inputType = 'text',
  bordersColor = 'gray',
  handleSubmit = _value => {},
  setInputValue,
  ...props
}: InputProps) => {
  const [text, setText] = React.useState('');
  const [isTouched, setIsTouched] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChangeText = (input: string) => {
    setInputValue ? setInputValue(input) : setText(input);
    if (validate) {
      setIsTouched(true);
    }
  };

  const borderColor =
    isInvalid || (validate && isTouched && text.trim() === '')
      ? 'red'
      : bordersColor;
  const showValidationMessage = isTouched && validate && text.trim() === '';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getKeyboardType = () => {
    switch (inputType) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      default:
        return keyboardType;
    }
  };

  return (
    <View>
      <TextInput
        style={[
          {
            height: multiline ? 'auto' : 40,
            borderColor: borderColor,
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            textAlignVertical: multiline ? 'top' : 'center',
            // color: 'black',
          },
          style,
        ]}
        onSubmitEditing={() => handleSubmit(text)}
        onChangeText={handleChangeText}
        value={text}
        secureTextEntry={
          inputType === 'password' ? !showPassword : secureTextEntry
        }
        placeholderTextColor={'gray'}
        placeholder={placeholder}
        keyboardType={getKeyboardType()}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        onBlur={() => setIsTouched(true)}
        {...props}
      />
      {inputType === 'password' && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{position: 'absolute', right: 10, top: 10}}>
          {showPassword ? (
            <Image
              source={OtherIcons.Eye as ImageSourcePropType}
              style={{width: 20, height: 20}}
            />
          ) : (
            <Image
              source={OtherIcons.EyeX as ImageSourcePropType}
              style={{width: 20, height: 20}}
            />
          )}
        </TouchableOpacity>
      )}
      {showValidationMessage && (
        <Text style={{color: 'red', fontSize: 12, marginTop: 5}}>
          {errorMessage || validationMessage}
        </Text>
      )}
    </View>
  );
};

export default Input;
