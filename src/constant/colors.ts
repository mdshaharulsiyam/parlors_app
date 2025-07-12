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
    // primary: '#017FF4',
    // secondary: '#E2E8F0',
    primary: '#10B981', // emerald
    secondary: '#D1FAE5', // minty green

    // primary: '#8B5CF6', // violet
    // secondary: '#EDE9FE', // lavender

    // primary: '#4CAF50', // medium green
    // secondary: '#F0FDF4', // light green tint

    black: '#000000',
    white: '#FFFFFF',
    yellow: '#FF9B17',
    red: '#FF0000',
    green: '#00FF00',
    constWhite: '#FFFFFF',
    constBlack: '#000000',
  } as ITheme,
  dark: {
    primary: '#017FF4',
    secondary: '#E2E8F0',
    black: '#FFFFFF',
    white: '#000000',
    yellow: '#FF9B17',
    red: '#FF0000',
    green: '#00FF00',
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
