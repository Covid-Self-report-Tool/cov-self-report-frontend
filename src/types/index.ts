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
  confirmed: number;
  deaths: number;
  recovered: number;
  confirmed_day_change?: number;
  dead_day_change?: number;
  recovered_day_change?: number;
  ISO_AW2?: number;
};

// TODO: rm when fully migrated away from JHU API
// export type GlobalType = {
//   NewConfirmed: number;
//   TotalConfirmed: number;
//   NewDeaths: number;
//   TotalDeaths: number;
//   NewRecovered: number;
//   TotalRecovered: number;
// };

// TODO: rm when fully migrated away from JHU API
// export type JhuApiResponse = {
//   body: {
//     Global: GlobalType;
//     Countries: [
//       {
//         Country: string;
//         CountryCode: string;
//         Slug: string;
//         NewConfirmed: number;
//         TotalConfirmed: number;
//         NewDeaths: number;
//         TotalDeaths: number;
//         NewRecovered: number;
//         TotalRecovered: number;
//         Date: string;
//       }
//     ];
//   };
// };
