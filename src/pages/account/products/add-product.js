import React, { useReducer, useState } from "react";
import { getFileSize, uuid, validateAddProductForm } from "../../../helpers";
import { Dialog, InputError } from "../../../components";
import { addProductToShop, uploadFile } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/authentication/auth-slice";
import { getDashboardProducts } from "../../../redux/dashboard/dashboard-actions";
import { getUser } from "../../../redux/authentication/auth-actions";

const INITIAL_STATE = {
  title: "",
  description: "",
  price: "",
  quantityAvailable: "",
  currency: "NGN",
};

function AddProduct() {
  const [drag, setDrag] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [inputError, setInputError] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [product, dispatchInputEvent] = useReducer((state, action) => {
    switch (action.type) {
      case "GET_INPUT":
        const event = action.payload;
        const { name, value } = event.target;
        return { ...state, [name]: value };
      case "CLEAR":
        return INITIAL_STATE;
      default:
    }
  }, INITIAL_STATE);

  const addProduct = async () => {
    setError("");
    setLoading(true);
    try {
      product.productId = uuid();
      product.shopId = user.shopId;
      product.productImage = await uploadFile(
        product.productImage,
        "products",
        product.productId
      );
      const res = await addProductToShop(product);
      setShow(true);
      setLoading(false);
      if (res.err) {
        setError(res.err ? res.err.toString() : "Something went wrong");
      } else {
        dispatch(getUser);
        dispatch(getDashboardProducts);
        setStatus("success");
      }
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const errors = validateAddProductForm(product);
        if (errors.atLeastAnError) {
          setInputError(errors);
        } else {
          setInputError({});
          addProduct();
        }
      }}
    >
      {show ? (
        status === "success" ? (
          <Dialog
            state="success"
            title="Successful"
            message={`
              Product was successfully added to store and would be available on jumga immediately
            `}
            callbackText="Add New Product"
            cancel={() => {
              setShow(false);
              setStatus("");
            }}
            callback={() => {
              setProductImage(null);
              dispatchInputEvent({ type: "CLEAR" });
              setShow(false);
              setStatus("");
            }}
          />
        ) : (
          <Dialog
            state="failed"
            title="Error"
            message={error}
            callbackText="Try again"
            cancel={() => {
              setShow(false);
              setStatus("");
            }}
            callback={() => {
              setShow(false);
              setStatus("");
            }}
          />
        )
      ) : null}
      <div className="w-full px-8 mt-4">
        <div class="flex flex-col w-full justify-center items-center">
          <label className="block w-full sm:w-1/2 mt-4">
            <span className="text-gray-600">Title</span>
            <input
              className="w-full p-2 focus:outline-none rounded border text-black"
              placeholder="Title"
              name="title"
              value={product.title}
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {inputError.title && <InputError message={inputError.title} />}
          </label>
          <label className="block w-full sm:w-1/2 mt-4">
            <span className="text-gray-600">Description</span>
            <input
              className="w-full p-2 focus:outline-none rounded border text-black"
              placeholder="Product description"
              name="description"
              value={product.description}
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {inputError.description && (
              <InputError message={inputError.description} />
            )}
          </label>
          <label className="block w-full sm:w-1/2 mt-4">
            <span className="text-gray-600">Quantity Available</span>
            <input
              className="w-full p-2 focus:outline-none rounded border text-black"
              placeholder="Quantity Available"
              name="quantityAvailable"
              value={product.quantityAvailable}
              onChange={(event) => {
                event.persist();
                dispatchInputEvent({ type: "GET_INPUT", payload: event });
              }}
            />
            {inputError.quantityAvailable && (
              <InputError message={inputError.quantityAvailable} />
            )}
          </label>
          <label className="block w-full sm:w-1/2 mt-4">
            <span className="text-gray-600">Price</span>
            <div className="flex flex-col phn:flex-row w-full">
              <select
                defaultValue="NGN"
                name="currency"
                value={product.currency}
                className="appearance-none p-2 focus:outline-none rounded border text-black"
                onChange={(event) => {
                  event.persist();
                  dispatchInputEvent({ type: "GET_INPUT", payload: event });
                }}
              >
                <option value="NGN">NGN</option>
                <option value="GHS">GHS</option>
                <option value="KES">KES</option>
                <option value="EUR">EUR</option>
              </select>
              <input
                className="w-full mt-4 phn:mt-0 ml-0 phn:ml-2 p-2 focus:outline-none rounded border text-black"
                placeholder="0.0"
                name="price"
                value={product.price}
                onChange={(event) => {
                  event.persist();
                  dispatchInputEvent({ type: "GET_INPUT", payload: event });
                }}
              />
            </div>
            {inputError.price && <InputError message={inputError.price} />}
          </label>
          <label className="block w-full sm:w-1/2 mt-4 text-gray-600">
            Product Image
          </label>
          <div
            className={`w-ful sm:w-1/2 p-2 my-3 cursor-pointer flex items-center justify-center rounded-lg border-2 border-dashed ${
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
              product.productImage = file;
              setProductImage(file);
            }}
          >
            <label
              htmlFor="image_upload"
              className="cursor-pointer text-center"
            >
              {productImage
                ? `${productImage.name} ( ${getFileSize(productImage.size)} )`
                : "Drag or tap to add a product image ( 1 file max )"}
            </label>
            <input
              type="file"
              id="image_upload"
              name="image_upload"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              onChange={(event) => {
                event.preventDefault();
                product.productImage = event.target.files[0];
                setProductImage(event.target.files[0]);
              }}
            />
          </div>
          <div className="w-full sm:w-1/2">
            {inputError.productImage && (
              <InputError message={inputError.productImage} />
            )}
          </div>
          <button
            type="submit"
            className="w-44 phn:w-1/2 flex flex-row items-center justify-center px-4 bg-green-400 p-2 mt-8 rounded shadow-md text-white focus:outline-none"
          >
            <span className="text-sm">
              {loading ? "Please wait..." : "ADD PRODUCT"}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddProduct;
