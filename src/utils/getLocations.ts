import * as Location from 'expo-location';

export const getLocation = async () => {
  const {status} = await Location.requestForegroundPermissionsAsync();
  if (status !== Location.PermissionStatus.GRANTED) return null;

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  const {latitude, longitude} = position.coords;
  return {latitude, longitude};
};
