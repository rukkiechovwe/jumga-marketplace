import React from "react";

export default function Avatar({ user }) {
  return (
    <button>
      <img
        className="inline-block h-7 w-7 rounded-full ring-1 ring-white color-blue"
        src="https://www.stanlee.xyz/assets/images/ico.png"
        alt=""
      />
    </button>
  );
}
