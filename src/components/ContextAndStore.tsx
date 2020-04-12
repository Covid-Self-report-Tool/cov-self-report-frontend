import React, { useReducer, useContext, createContext } from 'react';

import { OurApiResponse, JhuApiResponse } from 'types';

type InitialCountryStateType = JhuApiResponse;

type InitialSelfSubmitStateType = {
  countries: [];
};

type ContextType = {};

type ActionType = {
  type:
    | 'SET_COUNTRY_DATA'
    | 'SET_SELF_SUBMITTED_DATA'
    | 'SET_USER_SPECIFIC_DATA';
};

type InitialStateType = {
  currentTotals: {
    confirmed: number;
    dead: number;
    recovered: number;
  }; // just the JHU stats (for the tickers)
  countries: []; // JHU countries data
  allSelfSubmittedPoints: []; // self-submitted points (our body.data.locations)
  userSpecificSelfSubmitted: {}; // stuff for pre-populating symptoms form
};

type StoreProviderType = {
  children: React.ReactNode;
};

// A) Like this
export const initialStateSimple = {
  currentTotals: {
    confirmed: 0,
    dead: 0,
    recovered: 0,
  }, // just the JHU stats (for the tickers)
  countries: [], // JHU countries data
  allSelfSubmittedPoints: [], // self-submitted points (our body.data.locations)
  userSpecificSelfSubmitted: {}, // stuff for pre-populating symptoms form
};

// B) ...or this?
export const initialStateFullsies = {
  countriesResponse: {}, // the full JHU response, including `body`
  selfSubmittedResponse: {}, // the full response from our API, including `body`
  userSpecificSelfSubmitted: {}, // same as option A above
};

export type DispatchFormType = React.Dispatch<ActionType>;

type daFuq = {
  email: string;
};

const initialState = {
  email: '',
};

const reducer = (state: daFuq, action: DispatchFormType) => {
  return state;
};

const reducerOrig = (
  state: InitialStateType,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case 'SET_COUNTRY_DATA':
      return {
        ...state,
      };
    case 'SET_SELF_SUBMITTED_DATA':
      return {
        ...state,
      };
    // e.g. pre-populating symptoms form
    case 'SET_USER_SPECIFIC_DATA':
      return {
        ...state,
      };
    default:
      return state;
  }
};

// export type DispatchFormType = React.Dispatch<SubmissionFormAction>;

// Good article on setting all this up:
// https://www.simplethread.com/cant-replace-redux-with-hooks/
export const DispatchContext = createContext({});
export const StoreContext = createContext(initialState);

export function StoreProvider(props: StoreProviderType) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
    </DispatchContext.Provider>
  );
}

export const useDispatch = () => useContext(DispatchContext);
export const useStore = () => useContext(StoreContext);
