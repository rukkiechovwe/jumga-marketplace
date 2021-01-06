export default function Loading({ message = "Please wait..." }) {
  return (
    <div className="h-full flex flex-row justify-center items-center">
      {/* <div class="animate-spin h-5 w-5 mr-3"></div> */}
      <p className="">{message}</p>
    </div>
  );
}
