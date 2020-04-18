export const prettyDate = (original: string) => {
  if (original === '') {
    return 'N/A';
  }

  const date = new Date(original);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
