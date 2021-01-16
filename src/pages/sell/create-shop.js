import { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { history } from "../../App";
import storeImg from "../../assets/images/storeImg.jpg";
import { createPendingShop } from "../../api/shop";
import {
  getFileSize,
  uuid,
  getSlug,
  validateCreateShopForm,
} from "../../helpers";
import { selectUser } from "../../redux/authentication/auth-slice";
import { uploadFile } from "../../api/firebase";
import { Alert, InputError } from "../../components";
import "../../bg-color.css";

export default function CreateShop() {
  const user = useSelector(selectUser);
  const [drag, setDrag] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState({});
  const [loading, setLoading] = useState(false);
  const [shop, dispatchInputEvent] = useReducer((state, action) => {
    switch (action.type) {
      case "GET_INPUT":
        const event = action.payload;
        const { name, value } = event.target;
        return { ...state, [name]: value };
      default:
    }
  }, {});

  async function createShop() {
    setError("");
    setLoading(true);
    if (user) {
      shop.featuredImage = featuredImage;
      shop.slug = getSlug(shop.title && shop.title);
      shop.shopId = uuid();
      shop.userId = user.userId;
      try {
        shop.featuredImage = await uploadFile(
          shop.featuredImage,
          "shopsFeaturedImages"
        );
        const res = await createPendingShop(shop);
        setLoading(false);
        if (res.err) {
          setError(res.err || res.err.message || "Something went wrong");
        } else {
          shop.dispatcher = res.shop && res.shop.dispatcher;
          history.push(`/shop-payment?slug=${shop.slug}`, {
            payload: shop,
          });
        }
      } catch (error) {
        setError(error || "Something went wrong");
      }
    }
  }

  return (
    <div className="relative h-screen w-full">
      <div className="hidden sm:block w-1/2 h-full bg-green-100 z-10">
        <div
          className="h-full bg-no-repeat bg-center bg-cover bg-img"
          style={{ backgroundImage: `url(${storeImg})` }}
        ></div>
      </div>
      <div className="w-full sm:w-1/2 absolute right-0 top-0 bg-white h-full">
        <div className="p-0 sm:p-9 w-full h-full relative flex flex-col items-center justify-center text-left sm:text-center">
          <div className="py-4 sm:py-8 text-center">
            <h2 className="text-3xl phn:text-4xl">Create Store</h2>
            <span className="text-gray-500 text-sm">Step 1 of 2</span>
          </div>
          <form
            className="flex flex-col justify-center items-center w-5/6"
            onSubmit={(event) => {
              event.preventDefault();
              const errors = validateCreateShopForm(shop);
              if (errors.atLeastAnError) {
                setInputError(errors);
              } else {
                setInputError({});
                if (hasAgreedToTerms) createShop();
              }
            }}
          >
            {error && <Alert message={error} />}
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              placeholder="Shop title eg My Awesome Shoe shop"
              name="title"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {inputError.title && <InputError message={inputError.title} />}
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              placeholder="Description"
              name="description"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {inputError.description && (
              <InputError message={inputError.description} />
            )}

            <label className="w-full text-left text-gray-400 ml-4 mt-3">
              Featured Image
            </label>
            <div
              className={`w-full p-2 my-3 cursor-pointer flex items-center justify-center rounded-lg border-2 border-dashed ${
                drag ? "border-green-400" : "border-gray-200"
              } text-sm font-medium py-4`}
              onDragOver={(event) => {
                event.preventDefault();
                setDrag(true);
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                setDrag(false);
              }}
              onDrop={(event) => {
                event.preventDefault();
                setDrag(false);
                let file;
                if (event.dataTransfer.items) {
                  if (event.dataTransfer.items[0].kind === "file") {
                    file = event.dataTransfer.items[0].getAsFile();
                  }
                } else {
                  file = event.dataTransfer.files[0];
                }
                shop.featuredImage = file;
                setFeaturedImage(file);
              }}
            >
              <label
                htmlFor="image_upload"
                className="cursor-pointer text-center"
              >
                {featuredImage
                  ? `${featuredImage.name} ( ${getFileSize(
                      featuredImage.size
                    )} )`
                  : "Drag or tap to add a featured image, This image is what we'll display on our marketplace"}
              </label>
              <input
                type="file"
                id="image_upload"
                name="image_upload"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={(event) => {
                  event.preventDefault();
                  shop.featuredImage = event.target.files[0];
                  setFeaturedImage(event.target.files[0]);
                }}
              />
            </div>
            {inputError.featuredImage && (
              <InputError message={inputError.featuredImage} />
            )}

            <div className="flex mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-400"
                  checked={hasAgreedToTerms}
                  onChange={(e) => {
                    setHasAgreedToTerms(!hasAgreedToTerms);
                  }}
                />
                <span className="ml-2 text-sm">
                  I agree to the{" "}
                  <span className="underline cursor-pointer text-green-400">
                    terms and conditions
                  </span>
                </span>
              </label>
            </div>
            <button
              className="px-4 bg-green-400 p-2 my-3 rounded-full text-white focus:outline-none hover:shadow-lg hover:bg--green-300 transition duration-500 ease-in-out"
              type="submit"
            >
              {loading ? "Please wait..." : "CREATE STORE"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
