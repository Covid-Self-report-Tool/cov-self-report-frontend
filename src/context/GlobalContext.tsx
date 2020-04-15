import React, { useEffect, useReducer, createContext, FC } from 'react';

// import { calculateTotals } from 'utils';
import { getSubmittedCases, getCountryGeoJSONData } from 'utils/api';
import { StoreActionType, InitialStateType } from 'types/context';
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
  symptomForm: {}, // stuff for pre-populating symptoms form
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
    default:
      return state;
  }
};

// Good article on setting all this up:
// https://www.simplethread.com/cant-replace-redux-with-hooks/
export const GlobalContext = createContext<{ state: any; dispatch: any }>({
  state: null,
  dispatch: null,
});

type GlobalProviderType = {
  children: React.ReactNode;
};

export const GlobalProvider: FC<GlobalProviderType> = ({ children }) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState);

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
      .catch(err => console.error(err)); // TODO: handle this better

    getCountryGeoJSONData()
      .then((geoJSON: GeoJSONData) => {
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
      })
      .catch(console.error); // TODO: error flash message instead
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
