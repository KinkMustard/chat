import React from "react";
import Layout from "./components/Layout";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import "./styles/css/index.min.css";
// import * as Colors from "../src/Colors";
import Themes from "../src/Themes";

let ButtonTheme = null;
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  changeTheme = ({
    baseColor,
    bodyColor,
    popColor,
    primary,
    secondary,
    fontColor
  }) => {
    ButtonTheme = createMuiTheme({
      palette: {
        primary: { main: primary },
        secondary: { main: secondary }
      },
      baseColor: baseColor,
      bodyColor: bodyColor,
      popColor: popColor,
      fontColor: fontColor
    });
    this.forceUpdate();
  };

  componentWillMount() {
    this.changeTheme(Themes.blue.dark);
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
