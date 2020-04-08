export const camelCaseToLabel = (original: string) => {
  const result = original.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};
