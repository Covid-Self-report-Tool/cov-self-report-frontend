import React, { useEffect, useReducer, useContext, createContext } from 'react';

import { getCountryData, getSubmittedCases } from 'utils/api';
import { ActionType, InitialStateType, StoreProviderType } from 'types/context';

export const initialState = {
  currentTotals: {
    confirmed: 0,
    dead: 0,
    recovered: 0,
    submitted: 0,
  }, // just the JHU stats (for the tickers)
  countries: [], // JHU countries data
  allSelfSubmittedPoints: [], // self-submitted points (our body.data.locations)
  userSpecificSelfSubmitted: {}, // stuff for pre-populating symptoms form
};

const reducer = (
  state: InitialStateType,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case 'SET_COUNTRY_DATA':
      return {
        ...state,
        countries: action.payload,
        // totals: // TODO: action.payload.reduce
      };
    case 'SET_SELF_SUBMITTED_DATA':
      return {
        ...state,
        allSelfSubmittedPoints: action.payload,
      };
    case 'SET_USER_SPECIFIC_DATA': // e.g. pre-populating symptoms form
      return {
        ...state,
      };
    default:
      return state;
  }
};

// Good article on setting all this up:
// https://www.simplethread.com/cant-replace-redux-with-hooks/
export const DispatchContext = createContext(null);
export const StoreContext = createContext(initialState);

export function StoreProvider(props: StoreProviderType) {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  useEffect(() => {
    getSubmittedCases()
      .then(response => {
        // @ts-ignore
        dispatch({
          type: 'SET_SELF_SUBMITTED_DATA',
          payload: response.body.data.locations,
        });
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getCountryData()
      // @ts-ignore
      .then(response => {
        // @ts-ignore
        dispatch({
          type: 'SET_COUNTRY_DATA',
          payload: response.body.features,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
    </DispatchContext.Provider>
  );
}

export const useDispatch = () => useContext(DispatchContext);
export const useStore = () => useContext(StoreContext);
