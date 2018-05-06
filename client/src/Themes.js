/* eslint import/no-webpack-loader-syntax: 0 */

// import * as Colors from "./Colors";
import * as Colors from "!!sass-variable-loader!./styles/globals.scss";
import * as ThemeColors from "!!sass-variable-loader!./styles/themeColors.scss";

export const DeepOrange = {
  dark: {
    baseColor: Colors.black,
    bodyColor: Colors.blackBody,
    popColor: Colors.blackPop,
    fontColor: Colors.greyFont,
    primary: Colors.orange,
    secondary: Colors.red
  },
  light: {
    baseColor: Colors.white,
    bodyColor: Colors.whiteBody,
    popColor: Colors.whitePop,
    fontColor: Colors.whiteFont,
    primary: Colors.orange,
    secondary: Colors.red
  }
};

export const Orange = {
  dark: {
    baseColor: Colors.black,
    bodyColor: Colors.blackBody,
    popColor: Colors.blackPop,
    fontColor: Colors.greyFont,
    primary: Colors.orange,
    secondary: Colors.red
  },
  light: {
    baseColor: Colors.white,
    bodyColor: Colors.whiteBody,
    popColor: Colors.whitePop,
    fontColor: Colors.whiteFont,
    primary: Colors.orange,
    secondary: Colors.red
  }
};

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

export const Green = {
  dark: {
    baseColor: Colors.black,
    bodyColor: Colors.blackBody,
    popColor: Colors.blackPop,
    fontColor: Colors.greyFont,
    primary: Colors.green,
    secondary: Colors.red
  },
  light: {
    baseColor: Colors.white,
    bodyColor: Colors.whiteBody,
    popColor: Colors.whitePop,
    fontColor: Colors.whiteFont,
    primary: Colors.green,
    secondary: Colors.red
  }
};

export const Purple = {
  dark: {
    baseColor: Colors.black,
    bodyColor: Colors.blackBody,
    popColor: Colors.blackPop,
    fontColor: Colors.greyFont,
    primary: Colors.purple,
    secondary: Colors.red
  },
  light: {
    baseColor: Colors.white,
    bodyColor: Colors.whiteBody,
    popColor: Colors.whitePop,
    fontColor: Colors.whiteFont,
    primary: Colors.purple,
    secondary: Colors.red
  }
};

export const Teal = {
  dark: {
    baseColor: Colors.black,
    bodyColor: Colors.blackBody,
    popColor: Colors.blackPop,
    fontColor: Colors.greyFont,
    primary: Colors.teal,
    secondary: Colors.red
  },
  light: {
    baseColor: Colors.white,
    bodyColor: Colors.whiteBody,
    popColor: Colors.whitePop,
    fontColor: Colors.whiteFont,
    primary: Colors.teal,
    secondary: Colors.red
  }
};
