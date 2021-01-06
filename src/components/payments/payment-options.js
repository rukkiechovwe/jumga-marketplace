export default function Blehhh() {

    return (
        <div className="mt-4 md:mt-0 md:fixed right-0 h-full md:h-screen bg-gray-800 p-2 w-full md:w-2/5 flex flex-col items-center justify-center text-center">
            <div className="py-8 text-white">
                <h2 className="text-4xl">PAYMENT</h2>
                <p className="text-gray-100 py-1">Payment method</p>
            </div>
            <form className="flex flex-col justify-center items-center w-5/6">
                <input
                    className="w-full bg-transparent border-solid border-b-2 border-gray-300 p-2 mt-4 focus:outline-none"
                    type="text"
                    name="name"
                    placeholder="Cardholder Name"
                ></input>
                <input
                    className="w-full bg-transparent border-solid border-b-2 border-gray-300 p-2 mt-4 focus:outline-none"
                    type="text"
                    name="number"
                    placeholder="Cardholder Number"
                ></input>
                <div className="w-full flex">
                    <div className="w-2/3">
                        <input
                            className="w-full bg-transparent border-solid border-b-2 border-gray-300 p-2 mt-4 mr-4 focus:outline-none"
                            type="text"
                            name="name"
                            placeholder="Exp. Date"
                        ></input>
                    </div>
                    <div className="w-1/3">
                        <input
                            className="w-full bg-transparent border-solid border-b-2 border-gray-300 p-2 mt-4 ml-4 focus:outline-none"
                            type="text"
                            name="number"
                            placeholder="CVV"
                        ></input>
                    </div>
                </div>
                <button
                    className=" bg-green-400 py-2 px-6 mt-12 mb-8 rounded-sm text-white focus:outline-none"
                    type="submit">
                    CHECKOUT
                    </button>
            </form>
        </div>
    );
}
