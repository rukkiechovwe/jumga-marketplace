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
import Slider from "react-slick";
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


  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 4000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div>
      <NavigationBar user={user} totalInCart={total} />
      {/* <Spacer top="50px" /> */}
      {product.isLoading && <center>LOADING...</center>}
      {product.error && (
        <p className="text-red-400 text-center">{product.message}</p>
      )}

      {/* carousel */}
      <div className="width-full overflow-hidden">
        <Slider {...settings}>
          <div className="h-96 w-full bg-black flex items-center justify-center p-2">
            <p className="w-full flex items-center text-4xl text-white">jumga</p>
          </div>
          <div className="h-96 w-full bg-black flex items-center justify-center p-2">
            <p className=" w-full flex items-center text-4xl text-white">jumga</p>
          </div>
        </Slider>
      </div>
      {/* carousel */}

      <div className="">
        {
          product.shops &&
          product.shops.map((shop) => {
            return (
              <div key={shop.shopId} className="mt-6 p-2">
                <div
                  onClick={() => {
                    dispatch(getCurrentVendor(shop));
                    history.push(`/vendors/${shop.shopId}`);
                  }}
                  className="m-2 cursor-pointer w-72 shadow-lg rounded-md"
                >
                  <div className="w-full">
                    <img
                      className="w-full"
                      src={shop.featuredImage}
                      alt={shop.title}
                      loading="eager"
                    />
                  </div>
                  <div className=" p-4">
                    <p className="font-bold uppercase">{shop.title}</p>
                    <p className="py-4">{shop.description}</p>
                    <p className="text-right text-green-500">{shop.tags.join(" ")}</p>
                  </div>
                </div>
              </div>

            );
          })
        }
      </div>
    </div>
  );
}

export default Marketplace;
