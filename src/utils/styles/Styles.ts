import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  flex1_center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  Button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});