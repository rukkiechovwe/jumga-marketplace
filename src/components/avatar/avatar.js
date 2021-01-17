import React from "react";
import icon from "../../assets/images/icon.png";

export default function Avatar({ user }) {
  return (
    <button>
      <img
        className="inline-block h-7 w-7 rounded-full ring-1 ring-white color-blue"
        src={icon}
        alt=""
      />
    </button>
  );
}
