import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../App";
import { NavigationBar, Spacer, Loading } from "../../components";
import SearchBox from "../../components/search";
import { selectUser } from "../../redux/authentication/auth-slice";
import { selectCartTotal } from "../../redux/cart/cart-slice";
import { getProducts } from "../../redux/product/product-actions";
import { selectProduct } from "../../redux/product/product-slice";

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
      {/* <SearchBox /> */}
      <Spacer top="50px" />
      {product.isLoading && <Loading />}
      {product.error && (
        <center style={{ color: "red" }}>{product.message}</center>
      )}
      <div className="flex flex-wrap p-5 w-full">
        {product.products &&
          product.products.map((product) => {
            return (
              <div
                key={product.product_id}
                className="text-center w-1/3 sm:2/5 mx:w-1/4 lg:w-1/5 py-3 px-2 m-3 rounded-lg shadow-sm cursor-pointer bg-white"
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
                      loading="eager"
                    />
                  </div>
                  <p className="text-sm pt-10 pb-7 mr-4 ml-4">
                    {product.title}
                  </p>
                  <div className="flex justify-between items-center w-full">
                    <p className="ml-4">NGN {product.price_ngn}</p>
                    <p className="bg-green-400 py-1 px-4 mr-4 text-white rounded-full">
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
