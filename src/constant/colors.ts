
export interface ITheme {
  text: string;
  background: string;
  background2: string;
  icon: string;
  icon2: string;
  black: string;
  white: string;
  red: string;
}
export const Colors = {
  light: {
    icon: "#00bcd4",
    icon2: "#e0f7fa",
    text: "#000000",
    background: "#FFFFFF",
    background2: "#f4f4f4",
    black: "#000000",
    white: "#FFFFFF",
    red: "#f70202",
  } as ITheme
}

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