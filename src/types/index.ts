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

export type Symptom = {
  isPresent: boolean;
  startDate?: Date;
  endDate?: Date;
};

export type UserContext = {
  userToken: string;
  hasSubmitted: boolean;
};

export enum Symptoms {
  headache = 'headache',
  fever = 'fever',
  shortnessOfBreath = 'shortnessOfBreath',
  cough = 'cough',
  nausea = 'nausea',
  lackOfTaste = 'lackOfTaste',
  lackOfSmell = 'lackOfSmell',
  soreThroat = 'soreThroat',
}

export type SymptomFever = {
  isPresent: boolean;
  startDate?: Date;
  endDate?: Date;
  temperature?: number;
};

export type SymptomForm = {
  symptoms: { [index in keyof typeof Symptoms]: SymptomFever };
  location: {
    lat: number;
    lng: number;
  } | null;
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
