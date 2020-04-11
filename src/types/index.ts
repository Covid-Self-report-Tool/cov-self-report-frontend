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
