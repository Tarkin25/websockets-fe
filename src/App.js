import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
