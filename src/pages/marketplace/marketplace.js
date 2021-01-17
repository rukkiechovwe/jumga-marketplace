import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../App";
import { Footer, Loading, NavigationBar } from "../../components";
import { selectUser } from "../../redux/authentication/auth-slice";
import { selectCartTotal } from "../../redux/cart/cart-slice";
import { getShops } from "../../redux/product/product-actions";
import {
  selectProduct,
  setCurrentVendor,
} from "../../redux/product/product-slice";
import Slider from "react-slick";
import bannerA from "../../assets/images/banner-1.jpg";
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
          <div className="width-full mr-20 ml-20 overflow-hidden">
            <Slider {...SETTINGS}>
              <div
                className="h-96 w-full flex items-center justify-center p-2"
                // className="w-full bg-no-repeat bg-center bg-cover"
                // style={{
                //   backgroundImage: `url(${bannerA})`,
                // }}
              >
                <img
                  className="h-full w-full object-contain"
                  src={bannerA}
                  alt="bannerA"
                />
              </div>
              <div className="h-96 w-full flex items-center justify-center p-2">
                <img
                  className="h-full w-full object-contain"
                  src={bannerB}
                  alt="bannerA"
                />
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
                    className="m2 mb-10 phn:m-4 flex-grow rounded-md w-full phn:w-1/3 lg:1/4 md:max-w-1/4 min-w-sm shadow-lg"
                  >
                    <div
                      onClick={() => {
                        dispatch(setCurrentVendor(shop));
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
      {/* <Footer /> */}
    </div>
  );
}

export default Marketplace;
