import { useEffect, useState } from "react";

export default function Alert({ type, label, callback }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
      callback && callback();
    }, 3000);
  }, []);
  let style = "bg-red-50 text-red-600";
  switch (type) {
    case "success":
      style = "bg-green-50 text-green-600";
    case "error":
    default:
  }
  return (
    <div className={`${hidden && `hidden`} ${style}`}>
      <small className="p-4">{label}</small>
    </div>
  );
}
