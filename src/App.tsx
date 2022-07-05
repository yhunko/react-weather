import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import Routes from "src/routes";
import store from "src/store";

const App: React.FC = () => (
  <HashRouter>
    <Provider store={store}>
      <CssBaseline />

      <Routes />
    </Provider>
  </HashRouter>
);

export default App;
