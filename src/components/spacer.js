export default function Spacer({ top = 0, bottom = 0, left = 0, right = 0 }) {
  return <div style={{ margin: `${top} ${right} ${bottom} ${left}` }}></div>;
}
