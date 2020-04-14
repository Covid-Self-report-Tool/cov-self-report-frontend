import React, { useEffect, useReducer, useContext, createContext } from 'react';

// import { calculateTotals } from 'utils';
import { getSubmittedCases, getCountryGeoJSONData } from 'utils/api';
import { ActionType, InitialStateType, StoreProviderType } from 'types/context';

export const initialState = {
  currentTotals: {
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    selfReported: 0,
    suspected: 0,
  }, // just the JHU stats (for the tickers)
  countries: [], // JHU countries data
  allSelfReportedPoints: [], // self-submitted points (our body.data.locations)
  userSpecificSelfReported: {}, // stuff for pre-populating symptoms form
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
      };
    case 'SET_TOTALS':
      return {
        ...state,
        currentTotals: {
          ...state.currentTotals,
          ...action.totals,
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
        // @ts-ignore
        dispatch({
          type: 'SET_SELF_SUBMITTED_DATA',
          payload: response.body.data.locations,
        });

        // @ts-ignore
        dispatch({
          type: 'SET_TOTALS',
          totals: {
            selfReported: response.body.data.locations.length,
          },
        });
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    getCountryGeoJSONData().then(geoJSON => {
      dispatch({
        type: 'SET_COUNTRY_DATA',
        payload: geoJSON,
      });
    });
    // getCountryData()
    //   .then(response => {
    //     // gist returns text
    //     const features = JSON.parse(response.text).data;
    //     const totals = calculateTotals(features, {
    //       confirmed: 0,
    //       deaths: 0,
    //       recovered: 0,
    //     });
    //     // @ts-ignore
    //     dispatch({
    //       type: 'SET_COUNTRY_DATA',
    //       payload: features,
    //     });
    //     // @ts-ignore
    //     dispatch({
    //       type: 'SET_TOTALS',
    //       totals,
    //     });
    //   })
    //   .catch(err => console.error(err));
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
    </DispatchContext.Provider>
  );
}

export const useDispatch = () => useContext(DispatchContext);
export const useStore = () => useContext(StoreContext);
