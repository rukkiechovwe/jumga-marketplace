import { useEffect, useState } from "react";

export default function Alert({ type, label, callback }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
      callback();
    }, 3000);
  }, []);
  let style = { color2: "red", color1: "rgb(253, 219, 219)" };
  switch (type) {
    case "success":
      style.color1 = "greenAccent";
      style.color2 = "green";
    case "error":
    default:
  }
  return (
    <div
      className={hidden && `hidden`}
      style={{
        padding: "4px 10px",
        backgroundColor: style.color1,
        boxSizing: "border-box",
      }}
    >
      <small style={{ color: style.color2 }}>{label}</small>
    </div>
  );
}
