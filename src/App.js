import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Signup from "./pages/authentication/sign-up";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign-up" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
