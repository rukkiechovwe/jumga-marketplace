import React from "react";

function Footer() {
  const date = new Date();
  return (
    <div className="mt-8 p-2 bg-gray-900 text-white text-center w-full">
      <p>©{date.getFullYear()} Jumga</p>
    </div>
  );
}
export default Footer;
