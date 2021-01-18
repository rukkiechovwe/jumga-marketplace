import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../App";
import { Loading, NavigationBar } from "../../components";
import { selectUser } from "../../redux/authentication/auth-slice";
import { selectCartTotal } from "../../redux/cart/cart-slice";
import { getShops } from "../../redux/product/product-actions";
import {
  selectProduct,
  setCurrentMerchant,
} from "../../redux/product/product-slice";
import Slider from "react-slick";
import bannerA from "../../assets/images/img1.png";
import bannerB from "../../assets/images/banner-2.jpg";

const SETTINGS = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 700,
  autoplaySpeed: 4000,
  cssEase: "linear",
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Marketplace() {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const user = useSelector(selectUser);
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    if (!product.shops) {
      dispatch(getShops());
    }
  }, []);

  return (
    <div>
      <NavigationBar user={user} totalInCart={total} />
      {product.error && (
        <p className="text-red-400 text-center">{product.message}</p>
      )}
      {product.isLoading ? (
        <Loading />
      ) : (
          <div>
            {/* carousel */}
            <div className="width-screen overflow-hidden">
              <Slider {...SETTINGS}>
                <div className="h-auto md:h-96 w-full flex-col md:flex-row-reverse items-center justify-center p-2 bg-white">
                  <div className="w-full md:w-1/2">
                    <img className="w-full" alt="bannerA" src={bannerA} />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h2 className="text-4xl">Jumga</h2>
                    <p className="text-gray-500 py-1">
                      Check the store for items you want.
                    </p>
                  </div>
                </div>
                <div className="h-auto md:h-96 w-full flex-col md:flex-row-reverse items-center justify-center p-2 bg-white">
                  <div className="w-full md:w-1/2">
                    <img className="w-full" alt="bannerA" src={bannerA} />
                  </div>
                  <div className="w-full md:w-1/2">
                    <h2 className="text-4xl">Jumga</h2>
                    <p className="text-gray-500 py-1">
                      Sell on jumga for as low as $20.
                    </p>
                  </div>
                </div>
              </Slider>
            </div>
            {/* carousel */}
            <p className="text-black text-xl text-left mb-8  ml-8 sm:ml-24 font-semibold">
              Vendors
          </p>
            <div className="flex flex-row width-full justify-center flex-wrap mx-4 sm:mx-6 md:mx-20">
              {product.shops &&
                product.shops.map((shop) => {
                  return (
                    <div
                      key={shop.shopId}
                      className="m2 mr-0 phn:mr-6 phn:m-4 flex-grow rounded-lg w-full phn:w-1/3 lg:1/4 md:max-w-1/4 min-w-sm shadow-sm border"
                    >
                      <div
                        onClick={() => {
                          dispatch(setCurrentMerchant(shop));
                          history.push(`/vendors/${shop.shopId}`);
                        }}
                        className="cursor-pointer w-full"
                      >
                        <div className="w-full">
                          <img
                            className="w-full h-56"
                            src={shop.featuredImage}
                            alt={shop.title}
                            loading="eager"
                          />
                        </div>
                        <div className="h-24 p-4 overflow-ellipsis">
                          <p className="font-bold uppercase text-sm">
                            {shop.title}
                          </p>
                          <p className="pb-4 truncate text-gray-600">
                            {shop.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
    </div>
  );
}

export default Marketplace;
