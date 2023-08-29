export default function stringToRuDate(string_date: string) {
  const date = new Date(string_date);
  return date.toLocaleString("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}
