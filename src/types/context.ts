import React from 'react';

import { IGeoJson } from 'types';

export type CountriesFieldsForTotals = {
  total_confirmed: number;
  total_deaths: number;
  total_recovered: number;
};

export type StoreActionType =
  | { type: 'SET_LAST_COUNTRIES_UPDATE'; payload: Date }
  | { type: 'SET_COUNTRY_DATA'; payload: [] }
  | { type: 'SET_SELF_SUBMITTED_DATA'; payload: [] }
  | { type: 'SET_USER_DATA'; payload: {} }
  | { type: 'SET_SELF_SUBMITTED_TOTALS'; payload: number }
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
  suspected?: number;
};

// TOOD: get these from existing types
export type InitialStateType = {
  currentTotals: CurrentTotalsTypes; // ticker card stats
  countries: IGeoJson[]; // Pre-joined JHU countries data
  allSelfReportedPoints: []; // self-submitted points (our body.data.locations)
  userSelfReported: {}; // stuff for pre-populating symptoms form
  showSplash: boolean;
  hasSeenSplash: boolean;
  lastCountriesUpdate: Date | null;
};

// TODO: restore usage in global dispatch provider
export type ContextDispatchType = React.Dispatch<StoreActionType>;
