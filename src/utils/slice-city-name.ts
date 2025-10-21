export default function (displayName: string) {
  return displayName.split(",").slice(0, 3).join(",");
}
