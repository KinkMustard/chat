import React from "react";
import Layout from "./components/Layout";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import "./styles/css/index.min.css";
// import * as Colors from "../src/Colors";
import * as Themes from "../src/Themes";

let ButtonTheme = null;
class App extends React.Component {
  changeTheme = ({ baseColor, bodyColor, popColor, primary, secondary }) => {
    ButtonTheme = createMuiTheme({
      palette: {
        primary: { main: primary },
        secondary: { main: secondary }
      },
      baseColor: baseColor,
      bodyColor: bodyColor,
      popColor: popColor
    });
    console.log("theme changed");
  };

  componentWillMount() {
    this.changeTheme(Themes.Default);
  }

  render() {
    return (
      <MuiThemeProvider theme={ButtonTheme}>
        <Layout changeTheme={this.changeTheme} />;
      </MuiThemeProvider>
    );
  }
}

export default App;
