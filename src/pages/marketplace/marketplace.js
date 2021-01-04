import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../App";
import { NavigationBar, Spacer } from "../../components";
import { selectUser } from "../../redux/authentication/auth-slice";
import { selectCartTotal } from "../../redux/cart/cart-slice";
import { getShops } from "../../redux/product/product-actions";
import {
  getCurrentVendor,
  selectProduct,
} from "../../redux/product/product-slice";

// new shops would use camelCase
// pipe the shops through cart shops to get the quantity
function Marketplace() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const user = useSelector(selectUser);
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    // just get shops once okayy
    if (!product.shops) {
      dispatch(getShops());
    }
  }, []);
  return (
    <div>
      <NavigationBar user={user} totalInCart={total} />
      <Spacer top="50px" />
      {product.isLoading && <center>LOADING...</center>}
      {product.error && (
        <center style={{ color: "red" }}>{product.message}</center>
      )}
      {product.shops &&
        product.shops.map((shop) => {
          return (
            <center key={shop.shopId}>
              <div
                onClick={() => {
                  dispatch(getCurrentVendor(shop));
                  history.push(`/vendors/${shop.shopId}`);
                }}
                style={{
                  border: "1px solid grey",
                  maxWidth: "400px",
                  margin: "10px",
                  cursor: "pointer",
                }}
              >
                <center style={{ fontWeight: "bold" }}>{shop.title}</center>
                <center>{shop.description}</center>
                <center style={{ color: "green" }}>
                  {shop.tags.join(" ")}
                </center>
              </div>
            </center>
          );
        })}
    </div>
  );
}

export default Marketplace;
