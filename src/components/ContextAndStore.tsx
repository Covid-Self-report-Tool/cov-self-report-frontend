import React, { useEffect, useReducer, useContext, createContext } from 'react';

// import { calculateTotals } from 'utils';
import { getSubmittedCases, getCountryGeoJSONData } from 'utils/api';
import {
  StoreActionType,
  InitialStateType,
  StoreProviderType,
} from 'types/context';
import { GeoJSONData } from 'types/api';
import { calculateTotals } from 'utils';

export const initialState = {
  currentTotals: {
    total_confirmed: 0,
    total_deaths: 0,
    total_recovered: 0,
    selfReported: 0,
    suspected: 0,
  }, // just the JHU stats (for the tickers)
  countries: [], // JHU countries data
  allSelfReportedPoints: [], // self-submitted points (our body.data.locations)
  userSpecificSelfReported: {}, // stuff for pre-populating symptoms form
};

const reducer = (
  state: InitialStateType,
  action: StoreActionType
): InitialStateType => {
  switch (action.type) {
    case 'SET_COUNTRY_DATA':
      return {
        ...state,
        countries: action.payload,
      };
    case 'SET_SELF_SUBMITTED_TOTALS':
      debugger;
      return {
        ...state,
        currentTotals: {
          ...state.currentTotals,
          selfReported: action.payload,
        },
      };
    case 'SET_TOTALS':
      return {
        ...state,
        currentTotals: {
          ...state.currentTotals,
          ...action.payload,
        },
      };
    case 'SET_SELF_SUBMITTED_DATA':
      return {
        ...state,
        allSelfReportedPoints: action.payload,
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
        dispatch({
          type: 'SET_SELF_SUBMITTED_DATA',
          payload: response.body.data.locations,
        });

        dispatch({
          type: 'SET_SELF_SUBMITTED_TOTALS',
          payload: response.body.data.locations.length,
        });
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    getCountryGeoJSONData().then((geoJSON: GeoJSONData) => {
      dispatch({
        type: 'SET_COUNTRY_DATA',
        payload: geoJSON,
      });

      const totals = calculateTotals(geoJSON, {
        total_confirmed: 0,
        total_deaths: 0,
        total_recovered: 0,
      });

      dispatch({
        type: 'SET_TOTALS',
        payload: totals,
      });
    });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
    </DispatchContext.Provider>
  );
}

export const useDispatch = () => useContext(DispatchContext);
export const useStore = () => useContext(StoreContext);
