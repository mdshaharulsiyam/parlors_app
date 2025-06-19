import { StyleSheet } from 'react-native';
import { hexToRGBA } from '../utils/hexToRGBA';
import { Colors } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
  },
  input: {
    height: 56,
    width: '100%',
    borderWidth: .5,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
  },
  inputError: {
    borderColor: Colors.light.red as string,
  },
  inputSuccess: {
    borderColor: Colors.light.green as string,
  },
  inputPlaceholder: {
    color: hexToRGBA(Colors.light.black as string, 0.5),
  },

  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  buttonTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
