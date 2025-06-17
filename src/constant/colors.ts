export interface ITheme {
  primary: String;
  secondary: String;
  black: String;
  white: String;
  yellow: String;
  red: String;
  green: String;
}
export const Colors = {
  light: {
    primary: '#017FF4',
    secondary: '#E2E8F0',
    black: '#000000',
    white: '#FFFFFF',
    yellow: '#FF9B17',
    red: '#FF0000',
    green: '#00FF00',
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