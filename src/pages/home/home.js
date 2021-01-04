import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../App";
import { NavigationBar, Spacer } from "../../components";
import { selectUser } from "../../redux/authentication/auth-slice";
import { selectCartTotal } from "../../redux/cart/cart-slice";
import { getProducts } from "../../redux/product/product-actions";
import { selectProduct } from "../../redux/product/product-slice";

// new products would use camelCase
// pipe the products through cart products to get the quantity
function Home() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const user = useSelector(selectUser);
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    // just get products once okayy
    if (!product.products) {
      dispatch(getProducts());
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
      <div className="flex flex-wrap p-5 w-full">
        {product.products &&
          product.products.map((product) => {
            return (
              <div
                key={product.product_id}
                className="text-center w-1/3 sm:2/5 mx:w-1/4 lg:w-1/5 py-3 px-2 m-3 rounded-lg shadow-lg cursor-pointer bg-white"
              >
                <div
                  className="flex flex-col items-center justify-between h-full"
                  onClick={() => {
                    history.push(
                      `/vendors/${product.shop_id}/products/${product.product_id}`
                    );
                  }}
                >
                  <div className="w-20">
                    <img
                      className="w-full"
                      src={product.images}
                      alt={product.title}
                    />
                  </div>
                  <p className="font-bold pt-10 pb-7">{product.title}</p>
                  <div className="flex justify-between items-center w-full">
                    <p>₦ {product.price_ngn}</p>
                    <p className="bg-green-400 py-1 px-2 text-white rounded-full">
                      {/* {product.quantitiesAvailable} in stock */}
                      {product.quantities_available} in stock
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
