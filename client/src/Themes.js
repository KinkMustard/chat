/* eslint import/no-webpack-loader-syntax: 0 */

// import * as Colors from "./Colors";
import Colors from "!!sass-variable-loader!./styles/globals.scss";

export const Blue = {
  dark: {
    baseColor: Colors.black,
    bodyColor: Colors.blackBody,
    popColor: Colors.blackPop,
    fontColor: Colors.greyFont,
    primary: Colors.blue,
    secondary: Colors.red
  },
  light: {
    baseColor: Colors.white,
    bodyColor: Colors.whiteBody,
    popColor: Colors.whitePop,
    fontColor: Colors.whiteFont,
    primary: Colors.blue,
    secondary: Colors.red
  }
};

// export const Test = {
//   baseColor: Colors.Green,
//   bodyColor: Colors.Green,
//   popColor: Colors.Green,
//   primary: Colors.Green,
//   secondary: Colors.Green
// };

export const Test = {
  baseColor: Colors.green,
  bodyColor: Colors.green,
  popColor: Colors.green,
  fontColor: Colors.greyFont,
  primary: Colors.green,
  secondary: Colors.green
};
