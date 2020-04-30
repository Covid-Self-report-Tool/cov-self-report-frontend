// TODO: Create generic "APIResponse" type that we subclass or get more specific

export type UserContext = {
  userToken: string;
  hasSubmitted: boolean;
};

export type CountryRow = {
  country_code: string;
  country_name: string;
  total_confirmed: number;
  total_deaths: number;
  total_recovered: number;
  new_confirmed: number;
  new_deaths: number;
  new_recovered: number;
  // goejson properties from polygons
  ISO_A2?: number;
  NAME_LONG?: string;
};

export type TickerInfoType = {
  heading: string;
  defText: string;
  omitLastUpdated?: boolean; // e.g. don't need to show time for self-reported
};

// Handy utility to get only the required keys of an object type. This allows a
// someOtherObj[key] to ensure only existing keys are used.
// CRED: https://stackoverflow.com/a/50830054/1048518
export type RequiredKeys<T> = {
  [k in keyof T]-?: undefined extends T[k] ? never : k;
}[keyof T];
