import React from "react";
import { render } from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import theme from "./theme";
import "./index.css";
import Game from "./components/game";
import configureStore from "./store/configureStore";
// ========================================

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={configureStore()}>
      <Game />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
