export type Location = {
  lat: number;
  lng: number;
};

export type Symptom = {
  isPresent: boolean;
  startDate: Date | null;
  endDate: Date | null;
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
  startDate?: Date | null;
  endDate?: Date | null;
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
  tested: boolean | undefined;
  seenPhysician: boolean | undefined;
  testedPositive: boolean | undefined;
  doctorDiagnosis: DoctorDiagnosis;
  hasAgreedToTerms: boolean;
};

export type DoctorDiagnosis =
  | 'suspected'
  | 'inconclusive'
  | 'negative'
  | undefined;

export type DispatchFormType = React.Dispatch<SubmissionFormAction>;

export type SubmissionFormAction =
  | { type: 'TOGGLE_SYMPTOM'; payload: Symptoms }
  | { type: 'SET_VALUE' }
  | {
      type: 'SET_SYMPTOM_START_DATE';
      payload: { symptom: Symptoms; startDate: Date | null };
    }
  | {
      type: 'SET_SYMPTOM_END_DATE';
      payload: { symptom: Symptoms; endDate: Date | null };
    }
  | { type: 'SET_NUM_TIMES_TESTED'; payload: number }
  | { type: 'TOGGLE_AGREED' }
  | { type: 'SET_USER_DATA'; payload: SymptomForm }
  | { type: 'SET_TESTED'; payload: boolean }
  | { type: 'SET_ADDRESS'; payload: string }
  | { type: 'SET_SEEN_PHYSICIAN'; payload: boolean }
  | { type: 'SET_TESTED_POSITIVE'; payload: boolean }
  | { type: 'SET_DOCTOR_DIAGNOSIS'; payload: string }
  | { type: 'RESET_VALUE'; payload: keyof SymptomForm }
  | { type: 'SET_LOCATION'; payload: Location }
  | { type: 'RESET_SYMPTOMS' };
