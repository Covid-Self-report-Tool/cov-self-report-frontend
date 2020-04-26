export const prettyDate = (date: Date) => {
  const timezoneDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return `${timezoneDate.toLocaleDateString()} ${timezoneDate.toLocaleTimeString()}`;
};
