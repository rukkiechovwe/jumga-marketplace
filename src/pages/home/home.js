import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchProducts } from "../../api";
import { history } from "../../App";
import { NavigationBar, Spacer, Loading, Error } from "../../components";
import { getLastPathname } from "../../helpers";
import { selectUser } from "../../redux/authentication/auth-slice";
import { selectCartTotal } from "../../redux/cart/cart-slice";

function Home() {
  const location = useLocation();
  const user = useSelector(selectUser);
  const total = useSelector(selectCartTotal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    setError(false);
    const product = await fetchProducts(getLastPathname(location.pathname));
    if (product.err) {
      setError(true);
    } else {
      setProducts(product.products);
    }
    setLoading(false);
  };

  return (
    <div>
      <NavigationBar user={user} totalInCart={total} />
      <Spacer top="50px" />
      {loading && <Loading />}
      {error && (
        <Error
          message={error || `Something went wrong, it's not you, it's us.`}
        />
      )}
      <div className="flex flex-wrap p-5 w-full">
        {products && products.length === 0 && (
          <span className="w-full h-screen text-center text-black">
            No Product available on this store, check back later while we notify
            the merchant.
          </span>
        )}
        {products &&
          products.map((product) => {
            return (
              <div
                key={product.productId}
                className="text-center w-1/3 sm:2/5 mx:w-1/4 lg:w-1/5 py-3 px-2 m-3 rounded-lg shadow-sm cursor-pointer bg-white"
              >
                <div
                  className="flex flex-col items-center justify-between h-full"
                  onClick={() => {
                    history.push(
                      `/vendors/${product.shopId}/products/${product.productId}`
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
                  <p className="text-sm py-6 px-2">
                    {product.title}
                  </p>
                  <div className="flex justify-between items-center w-full">
                    <p className="mr-2">NGN {product.price_ngn}</p>
                    <p className="bg-green-400 py-1 px-4 ml-2 text-white rounded-full">
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
