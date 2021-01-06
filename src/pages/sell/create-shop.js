import { useState } from "react";
import loginImg from "../../assets/images/loginImg.jpg";

export default function CreateShop() {
  const [drag, setDrag] = useState(false);
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
            }}
          >
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              placeholder="Shop title eg My Awesome Shoe shop"
              onChange={(event) => {
                event.persist();
              }}
            />
            <input
              className="w-full border-solid border-b-2 border-gray-400 p-2 my-3 focus:outline-none"
              placeholder="Description"
              onChange={(event) => {
                event.persist();
              }}
            />
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
                if (event.dataTransfer.items) {
                  for (var i = 0; i < event.dataTransfer.items.length; i++) {
                    if (event.dataTransfer.items[i].kind === "file") {
                      var file = event.dataTransfer.items[i].getAsFile();
                      console.log("... file[" + i + "].name = " + file.name);
                    }
                  }
                } else {
                  for (var i = 0; i < event.dataTransfer.files.length; i++) {
                    console.log(
                      "... file[" +
                        i +
                        "].name = " +
                        event.dataTransfer.files[i].name
                    );
                  }
                }
              }}
            >
              <span class="text-center">
                Drag or tap to add a featured image, This image is what we'll
                display on our marketplace
              </span>
            </div>
            <button
              className="px-4 bg-green-400 p-2 my-3 rounded-full text-white focus:outline-none"
              type="submit"
            >
              CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
