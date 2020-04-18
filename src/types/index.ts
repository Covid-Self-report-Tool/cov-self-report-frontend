export type IGeometry = {
  type: string;
  coordinates: number[];
};

export type IGeoJson = {
  type: string;
  geometry: IGeometry;
  properties: CountryRow; // TODO: make this flexible for non-country GeoJSON
  bbox?: number[];
};

export type UserContext = {
  userToken: string;
  hasSubmitted: boolean;
};

export type PositionType = [number, number];

// TODO: Create generic "APIResponse" type that we subclass or get more specific
export type OurApiResponse = {
  text: string;
  body:
    | {
        // https://jsonapi.org/format/#errors
        errors?: {
          status?: string;
          title?: string;
          detail?: string;
        };
        meta?: {};
        data?: {
          locations: PositionType[];
        };
      }
    | any;
};

export type MapboxType = {
  tilesetId: string;
};

export type SubmittedType = {
  data: PositionType[];
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
  ISO_AW2?: number;
};

export interface TickerInfoType {
  heading?: string;
  defText?: string;
  omitLastUpdated?: boolean; // e.g. don't need to show time for self-reported
}
