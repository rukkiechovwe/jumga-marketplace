import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Signup, Login, ResetPassword } from "./pages/authentication";
import Home from "./pages/home";
import { getUser } from "./redux/authentication/auth-actions";
export const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  });
  return (
    <div className="">
      <Router history={history}>
        <Switch>
          <Route path="/sign-up" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
