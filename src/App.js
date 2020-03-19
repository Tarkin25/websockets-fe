import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserContextProvider from "./contexts/UserContext";
import {ThemeProvider} from '@material-ui/core';
import theme from "./config/theme";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <UserContextProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/test" component={TestPage} />
        </Switch>
      </UserContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
