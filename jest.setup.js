/* eslint-env jest */

require('react-native-gesture-handler/jestSetup');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-location', () => ({
  Accuracy: {Balanced: 3},
  PermissionStatus: {GRANTED: 'granted'},
  getCurrentPositionAsync: jest.fn(async () => ({
    coords: {latitude: 0, longitude: 0},
  })),
  requestForegroundPermissionsAsync: jest.fn(async () => ({status: 'granted'})),
}));

jest.mock('react-native-element-dropdown', () => {
  const React = require('react');
  const {View} = require('react-native');

  return {
    Dropdown: props => React.createElement(View, props),
  };
});
