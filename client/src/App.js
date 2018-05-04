import React from "react";
import Layout from "./components/Layout";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import "./styles/css/index.min.css";
import * as Colors from "../src/Colors";

const colorTheme = createMuiTheme({
  palette: {
    primary: { main: Colors.Blue },
    secondary: { main: Colors.Red }
  }
});
class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={colorTheme}>
        <Layout />;
      </MuiThemeProvider>
    );
  }
}

export default App;
