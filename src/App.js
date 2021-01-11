import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Signup, Login, ResetPassword } from "./pages/authentication";
import { Home } from "./pages/home";
import { getUser } from "./redux/authentication/auth-actions";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";
import { CheckoutAddress, CheckoutPayment } from "./pages/checkout";
import { getCart } from "./redux/cart/cart-slice";
import { Marketplace } from "./pages/marketplace";
import { CreateShop, SellOnboarding, ShopPayment } from "./pages/sell";
import ShopActivity from "./pages/user/dashboard/shop";
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
        <Route path="/checkout/address" component={CheckoutAddress} />
        <Route path="/checkout/payment" component={CheckoutPayment} />
        <Route path="/vendors/:id" component={Home} />
        <Route path="/vendors/:id/products/:id" component={Product} />
        <Route path="/sell" component={SellOnboarding} />
        <Route path="/create-shop" component={CreateShop} />
        <Route path="/shop-payment" component={ShopPayment} />
        <Route path="/user/dashboard" component={ShopActivity} />
        <Route path="/" component={Marketplace} exact />
      </Switch>
    </Router>
  );
}

export default App;
