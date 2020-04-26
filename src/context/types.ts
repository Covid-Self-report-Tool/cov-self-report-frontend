import React from 'react';
import { Color } from '@material-ui/lab/Alert';

import { IGeoJson } from 'types';

export type CountriesFieldsForTotals = {
  total_confirmed: number;
  total_deaths: number;
  total_recovered: number;
};

export type AlertPayloadType = {
  open: boolean;
  message?: string;
  severity?: Color;
};

export type StoreActionType =
  | {
      type: 'TOGGLE_UI_ALERT';
      payload: AlertPayloadType;
    }
  | {
      type: 'SET_COUNTRY_SYMBOLOGY';
      payload: keyof CountriesFieldsForTotals;
    }
  | { type: 'TOGGLE_LAYER_VISIBILITY'; payload: keyof LayerVisibilityTypes }
  | { type: 'SET_LAST_COUNTRIES_UPDATE'; payload: Date }
  | { type: 'SET_COUNTRY_DATA'; payload: [] }
  | { type: 'SET_USER_DATA'; payload: {} }
  | { type: 'SHOW_SPLASH'; payload: boolean }
  | {
      type: 'SET_TOTALS';
      payload: CountriesFieldsForTotals;
    };

export type CurrentTotalsTypes = {
  confirmed: number;
  deaths: number;
  recovered: number;
  selfReported: number;
};

export type CountryData = {
  total_confirmed: number;
  total_deaths: number;
  total_recovered: number;
  new_confirmed: number;
  new_deaths: number;
  new_recovered: number;
  date: Date;
};

export type LayerVisibilityTypes = {
  selfReported: boolean;
  countries: boolean;
};

// TOOD: get these from existing types
export type InitialStateType = {
  activeCountrySymbKey: keyof CountriesFieldsForTotals;
  layerVisibility: LayerVisibilityTypes;
  currentTotals: CurrentTotalsTypes; // ticker card stats
  countries: IGeoJson[]; // Pre-joined JHU countries data
  allSelfReportedPoints: []; // self-submitted points (our body.data.locations)
  userSelfReported: {}; // stuff for pre-populating symptoms form
  showSplash: boolean;
  hasSeenSplash: boolean;
  lastCountriesUpdate: Date | null;
  uiAlert: AlertPayloadType;
};

// TODO: restore usage in global dispatch provider
export type ContextDispatchType = React.Dispatch<StoreActionType>;

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
  city: string | null;
  state: string | null;
  county: string | null;
  country: string | null;
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

export type AddressComponents = {
  city: string | null;
  state: string | null;
  county: string | null;
  country: string | null;
};

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
  | {
      type: 'SET_ADDRESS_COMPONENTS';
      payload: AddressComponents;
    }
  | { type: 'RESET_USER_DATA' }
  | {
      type: 'SET_BIRTH_DATE';
      payload: { birthMonth: number; birthYear: number };
    }
  | { type: 'RESET_SYMPTOMS' };
