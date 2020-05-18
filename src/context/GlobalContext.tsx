import React, { useEffect, useReducer, createContext, FC } from 'react';
import 'date-fns';

import { bootstrapApp } from 'utils/api';
import { StoreActionType, InitialStateType } from 'context/types';

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
  showSplash: false,
  loginSignupModal: null,
  hasSeenSplash: !!localStorage.getItem('hasSeenSplash') || false,
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
    case 'TOGGLE_LOGIN_SIGNUP_MODAL':
      return {
        ...state,
        loginSignupModal: action.payload,
      };
    case 'TOGGLE_UI_ALERT':
      return {
        ...state,
        uiAlert: {
          ...state.uiAlert,
          ...action.payload,
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
    case 'SHOW_SPLASH':
      if (action.payload === true) {
        localStorage.setItem('hasSeenSplash', 'true');
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
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
