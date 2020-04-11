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

export type Location = {
  lat: number;
  lng: number;
};

export enum Symptoms {
  headache = 'headache',
  fever = 'fever',
  shortnessOfBreath = 'shortnessOfBreath',
  dryCough = 'dryCough',
  wetCough = 'wetCough',
  runnyNose = 'runnyNose',
  wheezing = 'wheezing',
  chestPain = 'chestPain',
  dizziness = 'dizziness',
  bodyAche = 'bodyAche',
  lightHeadedness = 'lightHeadedness',
  confusion = 'confusion',
  fatigue = 'fatigue',
  exhaustion = 'exhaustion',
  nausea = 'nausea',
  reducedSenseOfTaste = 'reducedSenseOfTaste',
  reducedSenseOfSmell = 'reducedSenseOfSmell',
  soreThroat = 'soreThroat',
}

export type SymptomFever = {
  isPresent: boolean;
  startDate?: Date;
  endDate?: Date;
  temperature?: number;
  severity?: number;
};

export type SymptomForm = {
  symptoms: { [index in keyof typeof Symptoms]: SymptomFever };
  location: Location | null;
  address: string | undefined;
  email: string | null;
  birthMonth: number | null;
  birthYear: number | null;
  phoneNumber: string | null;
  numTimesTested: number | null;
  testedPositive: boolean | null;
  seenADoctor: boolean | null;
  doctorSuspects: boolean | null;
  doctorInconclusive: boolean | null;
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
