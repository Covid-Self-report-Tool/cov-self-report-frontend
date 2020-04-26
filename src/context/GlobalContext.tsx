import React, { useEffect, useReducer, createContext, FC } from 'react';
import 'date-fns';

import { getCountryGeoJSONData, bootstrapApp } from 'utils/api';
import { StoreActionType, InitialStateType } from 'context/types';
import { GeoJSONData } from 'types/api';
import { calculateTotals } from 'utils';

export const initialState = {
  activeCountrySymbKey: 'total_confirmed',
  uiAlert: {
    open: false,
    message: '',
    severity: 'success',
  },
  layerVisibility: {
    selfReported: true,
    countries: true,
  },
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
  showSplash: false,
  hasSeenSplash: false,
  lastCountriesUpdate: null, // human-friendly timestamp of first country in JHU
};

const reducer = (
  state: InitialStateType,
  action: StoreActionType
): InitialStateType => {
  switch (action.type) {
    case 'SET_COUNTRY_SYMBOLOGY':
      return {
        ...state,
        activeCountrySymbKey: action.payload,
      };
    case 'TOGGLE_UI_ALERT':
      return {
        ...state,
        uiAlert: {
          ...state.uiAlert,
          open: action.payload.open,
          message: action.payload.message || state.uiAlert.message,
          severity: action.payload.severity || state.uiAlert.severity,
        },
      };
    case 'TOGGLE_LAYER_VISIBILITY':
      return {
        ...state,
        layerVisibility: {
          ...state.layerVisibility,
          [action.payload]: !state.layerVisibility[action.payload],
        },
      };
    case 'SET_LAST_COUNTRIES_UPDATE':
      return {
        ...state,
        lastCountriesUpdate: action.payload,
      };
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
    case 'SHOW_SPLASH':
      if (action.payload === true) {
        return {
          ...state,
          showSplash: action.payload,
          hasSeenSplash: true,
        };
      }
      return {
        ...state,
        showSplash: action.payload,
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
    bootstrapApp();

    getCountryGeoJSONData()
      .then((geoJSON: GeoJSONData) => {
        if (geoJSON[0].properties.date) {
          dispatch({
            type: 'SET_LAST_COUNTRIES_UPDATE',
            payload: new Date(geoJSON[0].properties.date),
          });
        }

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
      .catch(() => {
        dispatch({
          type: 'TOGGLE_UI_ALERT',
          payload: {
            open: true,
            message: 'Could not get countries features',
            severity: 'error',
          },
        });
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
