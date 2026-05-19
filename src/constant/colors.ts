export interface ITheme {
  primary: String;
  secondary: String;
  black: String;
  white: String;
  yellow: String;
  red: String;
  green: String;
  constWhite: String;
  constBlack: String;
}
export const Colors = {
  light: {
    primary: '#0F766E',
    secondary: '#CCFBF1',
    black: '#111827',
    white: '#F8FAFC',
    yellow: '#D97706',
    red: '#DC2626',
    green: '#16A34A',
    constWhite: '#FFFFFF',
    constBlack: '#000000',
  } as ITheme,
  dark: {
    primary: '#5EEAD4',
    secondary: '#134E4A',
    black: '#F8FAFC',
    white: '#020617',
    yellow: '#F59E0B',
    red: '#F87171',
    green: '#4ADE80',
    constWhite: '#FFFFFF',
    constBlack: '#000000',
  } as ITheme,
};

// export const Colors = {
//     light: {
//         icon: "#FF9B17",
//         icon2: "#FCB454",
//         text: "#000000",
//         background: "#FFFFFF",
//         background2: "#F5F5F5",
//         black: "#000000",
//         white: "#FFFFFF",
//         red: "#FF0000",
//     } as ITheme
// }
