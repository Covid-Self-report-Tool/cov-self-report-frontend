export const prettyPrint = (value: number) => {
  return value.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
  });
};

export const getCountryJSON = () => {};
