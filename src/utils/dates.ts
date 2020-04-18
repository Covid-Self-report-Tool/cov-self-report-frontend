export const prettyDate = (date: Date) => {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
