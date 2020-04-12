export type IGeometry = {
  type: string;
  coordinates: number[];
};

export type IGeoJson = {
  type: string;
  geometry: IGeometry;
  bbox?: number[];
  properties?: any;
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

export type ApiResponse = {
  body: {
    Global: {
      NewConfirmed: number;
      TotalConfirmed: number;
      NewDeaths: number;
      TotalDeaths: number;
      NewRecovered: number;
      TotalRecovered: number;
    };
    Countries: [
      {
        Country: string;
        CountryCode: string;
        Slug: string;
        NewConfirmed: number;
        TotalConfirmed: number;
        NewDeaths: number;
        TotalDeaths: number;
        NewRecovered: number;
        TotalRecovered: number;
        Date: string;
      }
    ];
  };
};

export type GeoLocation = {
  [key: string]: {
    confirmed: number;
    dead: number;
    recovered: number;
    confirmed_day_change?: number;
    dead_day_change?: number;
    recovered_day_change?: number;
  };
};

export type MapboxType = {
  tilesetId: string;
};

export type SubmittedType = {
  data: PositionType[];
};

export type CountryRow = {
  name: string;
  confirmed: number;
  dead: number;
  recovered: number;
  confirmed_day_change?: number;
  dead_day_change?: number;
  recovered_day_change?: number;
};

export type CountryTable = CountryRow[];

export type CountryTableType = {
  data: CountryTable;
};
