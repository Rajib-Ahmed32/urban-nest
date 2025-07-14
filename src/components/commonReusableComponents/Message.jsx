export default function Message({ text, className = "" }) {
  return <p className={`text-center py-12 ${className}`}>{text}</p>;
}
