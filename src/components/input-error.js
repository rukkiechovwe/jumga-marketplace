export default function InputError({ message = "Required field" }) {
  return (
    <small className="w-full text-red-500 py-1 text-left">{message}</small>
  );
}
