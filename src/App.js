import React from "react";
import Todos from "../src/components/Todos";
import Nav from "./components/Nav";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import ChangePassword from "../src/components/ChangePassword";

import { UsernameProvider } from "./contexts/UsernameContext";
function App() {
  return (
    <BrowserRouter>
      <UsernameProvider>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Todos />
          </Route>
          <Route exact path="/register" component={RegistrationForm}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route
            exact
            path="/change-password"
            component={ChangePassword}
          ></Route>
        </Switch>
      </UsernameProvider>
    </BrowserRouter>
  );
}

export default App;
