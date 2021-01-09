import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Signup, Login, ResetPassword } from "./pages/authentication";
import { Home } from "./pages/home";
import { getUser } from "./redux/authentication/auth-actions";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";
import { getCart } from "./redux/cart/cart-slice";
import { Marketplace } from "./pages/marketplace";
import { CreateShop, SellOnboarding, ShopPayment } from "./pages/sell";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getCart());
  }, []);
  return (
    <Router history={history}>
      <Switch>
        <Route path="/sign-up" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/cart" component={Cart} />
        <Route path="/vendors/:id/products/:id" component={Product} />
        <Route path="/vendors/:id" component={Home} />
        <Route path="/sell" component={SellOnboarding} />
        <Route path="/create-shop" component={CreateShop} />
        <Route path="/shop-payment" component={ShopPayment} />
        <Route path="/shop/:productId" component={ShopPayment} />
        <Route path="/" component={Marketplace} />
      </Switch>
    </Router>
  );
}

export default App;
