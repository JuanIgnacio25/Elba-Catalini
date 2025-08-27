export default function formatParam(param) {
  if (!param) return "";
  const decoded = decodeURIComponent(param).replace(/-/g, " ").toLowerCase();
  return decoded.charAt(0).toUpperCase() + decoded.slice(1);
}