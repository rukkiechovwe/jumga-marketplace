import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../App";
import { Loading, NavigationBar } from "../../components";
import { selectUser } from "../../redux/authentication/auth-slice";
import { selectCartTotal } from "../../redux/cart/cart-slice";
import { getShops } from "../../redux/product/product-actions";
import {
  selectProduct,
  setCurrentVendor,
} from "../../redux/product/product-slice";
import Slider from "react-slick";

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
    // just get shops once okayy
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
              <div className="h-96 w-full flex items-center justify-center p-2">
                <img
                  className="h-full w-full object-contain"
                  src="https://media.istockphoto.com/photos/excited-women-with-shopping-bags-looking-aside-picture-id1087256702?k=6&m=1087256702&s=612x612&w=0&h=-aMxPHPz8zk1PsRKSVV9cPRdjr0QAlM-h1hfhuhevX0="
                  alt="bannerA"
                />
              </div>
              <div className="h-96 w-full flex items-center justify-center p-2">
                <img
                  className="h-full w-full object-contain"
                  src="https://bengaltradingint.com/wp-content/uploads/2020/06/istockphoto-1033729610-612x612-1.jpg"
                  alt="bannerA"
                />
              </div>
              <div className="h-96 w-full flex items-center justify-center p-2">
                <img
                  className="h-full w-full object-contain"
                  src="https://www.divigear.com/wp-content/uploads/2018/10/product-carousel-image-01.jpg"
                  alt="bannerA"
                />
              </div>
            </Slider>
          </div>
          {/* carousel */}
          <p className="text-black text-xl text-left ml-24 font-semibold">
            Vendors
          </p>
          <div className="flex flex-row flex-wrap width-full mr-20 ml-20">
            {product.shops &&
              product.shops.map((shop) => {
                return (
                  <div key={shop.shopId} className="p-2 rounded-md">
                    <div
                      onClick={() => {
                        dispatch(setCurrentVendor(shop));
                        history.push(`/vendors/${shop.shopId}`);
                      }}
                      className="m-2 cursor-pointer w-72 shadow-lg rounded-md"
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
