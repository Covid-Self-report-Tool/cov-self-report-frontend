export type Location = {
  lat: number;
  lng: number;
};

export type Symptom = {
  isPresent: boolean;
  startDate?: Date;
  endDate?: Date;
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
  bodyAche = 'bodyAche',
  lightHeadedness = 'lightHeadedness',
  confusion = 'confusion',
  fatigue = 'fatigue',
  nausea = 'nausea',
  reducedTaste = 'reducedTaste',
  reducedSmell = 'reducedSmell',
  soreThroat = 'soreThroat',
  diarrhea = 'diarrhea',
  abdominalPain = 'abdominalPain',
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
  hasAgreedToTerms: boolean;
};

export type DispatchFormType = React.Dispatch<SubmissionFormAction>;

export type SubmissionFormAction =
  | { type: 'TOGGLE_SYMPTOM'; payload: Symptoms }
  | { type: 'SET_VALUE' }
  | { type: 'SET_SYMPTOM_START_DATE' }
  | { type: 'SET_SYMPTOM_END_DATE' }
  | { type: 'TOGGLE_AGREED' }
  | { type: 'SET_ADDRESS'; payload: string }
  | { type: 'SET_LOCATION'; payload: Location };
