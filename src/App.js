import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Signup, Login, ResetPassword } from "./pages/authentication";
import { Home } from "./pages/home";
import { getUser } from "./redux/authentication/auth-actions";
import { NavigationBar } from "./components";
import { selectUser } from "./redux/authentication/auth-slice";
import { selectCartTotal } from "./redux/cart/cart-slice";
import { Product } from "./pages/product";
export const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const total = useSelector(selectCartTotal);
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <div className="">
      <Router history={history}>
        <NavigationBar user={user} totalInCart={total} />
        <Switch>
          <Route path="/sign-up" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/product/:id" component={Product} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
