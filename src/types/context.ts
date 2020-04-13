import React from 'react';

import { CountryRow, IGeoJson } from '.';

export type ActionType =
  | { type: 'SET_COUNTRY_DATA'; payload: [] }
  | { type: 'SET_SELF_SUBMITTED_DATA'; payload: [] }
  | { type: 'SET_USER_SPECIFIC_DATA'; payload: {} };

// TOOD: get these from existing types
export type InitialStateType = {
  currentTotals: CountryRow; // ticker card stats
  countries: IGeoJson[]; // Pre-joined JHU countries data
  allSelfSubmittedPoints: []; // self-submitted points (our body.data.locations)
  userSpecificSelfSubmitted: {}; // stuff for pre-populating symptoms form
};

export type StoreProviderType = {
  children: React.ReactNode;
};

// TODO: restore usage in global dispatch provider
export type ContextDispatchType = React.Dispatch<ActionType>;
