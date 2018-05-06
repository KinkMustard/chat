/* eslint import/no-webpack-loader-syntax: 0 */

// import * as Colors from "./Colors";
import * as Colors from "!!sass-variable-loader!./styles/globals.scss";
import * as ThemeColors from "!!sass-variable-loader!./styles/themeColors.scss";

const ThemeCollection = Object.keys(ThemeColors).reduce(function(
  accumulator,
  currentValue
) {
  const temp = {
    [currentValue]: {
      dark: {
        baseColor: Colors.black,
        bodyColor: Colors.blackBody,
        popColor: Colors.blackPop,
        fontColor: Colors.greyFont,
        primary: Colors[currentValue],
        secondary: Colors.red
      },
      light: {
        baseColor: Colors.white,
        bodyColor: Colors.whiteBody,
        popColor: Colors.whitePop,
        fontColor: Colors.whiteFont,
        primary: Colors[currentValue],
        secondary: Colors.red
      }
    }
  };
  const gemp = Object.assign(accumulator, temp);
  return gemp;
},
{});

export default ThemeCollection;
