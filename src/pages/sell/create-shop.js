import { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { history } from "../../App";
import loginImg from "../../assets/images/loginImg.jpg";
import { createPendingShop } from "../../api/shop";
import { getFileSize, uuid, getSlug } from "../../helpers";
import { selectUser } from "../../redux/authentication/auth-slice";
import { uploadFile } from "../../api/firebase";

export default function CreateShop() {
  const user = useSelector(selectUser);
  const [drag, setDrag] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shop, dispatchInputEvent] = useReducer((state, action) => {
    switch (action.type) {
      case "GET_INPUT":
        const event = action.payload;
        const { name, value } = event.target;
        return { ...state, [name]: value };
      case "ERROR":
        return { ...state, error: action.payload, isLoading: false };
      default:
        throw new Error("No actionType");
    }
  }, {});

  async function createShop() {
    setError("");
    setLoading(true);
    if (user) {
      shop.featuredImage = featuredImage;
      shop.slug = getSlug(shop.title && shop.title);
      shop.shopId = uuid();
      shop.userId = user.user_id;
      try {
        shop.featuredImage = await uploadFile(
          shop.featuredImage,
          "shopsFeaturedImages"
        );
        const res = await createPendingShop(shop);
        setLoading(false);
        if (res.err) {
          setError(res.err.message ?? "Something went wrong");
        } else {
          shop.dispatcher = res.shop && res.shop.dispatcher;
          history.push(`/shop-payment?slug=${shop.slug}`, {
            payload: shop,
          });
        }
      } catch (error) {
        setError(error ?? "Something went wrong");
      }
    }
  }

  return (
    <div className="relative h-screen w-full sssss">
      <div className="hidden sm:block w-1/2 h-full">
        <div
          className="h-full bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: `url(${loginImg})` }}
        ></div>
      </div>
      <div className="w-full sm:w-1/2 absolute right-0 top-0 bg-white h-full">
        <div className="p-9 w-full h-full relative flex flex-col items-center justify-center text-center">
          <div className="py-8">
            <h2 className="text-4xl">Create Store</h2>
            <span className="text-gray-500 text-sm">Step 1 of 2</span>
          </div>
          <form
            className="flex flex-col justify-center items-center w-5/6"
            onSubmit={(event) => {
              event.preventDefault();
              createShop();
            }}
          >
            {error && (
              <span className="text-red-600 text-sm text-center w-full">
                {error}
              </span>
            )}
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              placeholder="Shop title eg My Awesome Shoe shop"
              name="title"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              placeholder="Description"
              name="description"
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
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
                  setFeaturedImage(event.target.files[0]);
                }}
              />
            </div>
            <div className="flex mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-green-400"
                  checked={hasAgreedToTerms}
                  onChange={(event) => {
                    event.preventDefault();
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
              className="px-4 bg-green-400 p-2 my-3 rounded-full text-white focus:outline-none"
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
