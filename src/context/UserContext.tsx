import React, { createContext, useReducer, useState, FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'config/firebase';

import { getUserData } from 'utils/api';
import { SymptomForm, SubmissionFormAction } from 'types/submission';

export const initialUserState: SymptomForm = {
  symptoms: {
    fever: { isPresent: false, startDate: null, endDate: null },
    headache: { isPresent: false, startDate: null, endDate: null },
    shortnessOfBreath: { isPresent: false, startDate: null, endDate: null },
    reducedSmell: { isPresent: false, startDate: null, endDate: null },
    reducedTaste: { isPresent: false, startDate: null, endDate: null },
    runnyNose: { isPresent: false, startDate: null, endDate: null },
    wheezing: { isPresent: false, startDate: null, endDate: null },
    chestPain: { isPresent: false, startDate: null, endDate: null },
    bodyAche: { isPresent: false, startDate: null, endDate: null },
    lightHeadedness: { isPresent: false, startDate: null, endDate: null },
    confusion: { isPresent: false, startDate: null, endDate: null },
    fatigue: { isPresent: false, startDate: null, endDate: null },
    soreThroat: { isPresent: false, startDate: null, endDate: null },
    nausea: { isPresent: false, startDate: null, endDate: null },
    dryCough: { isPresent: false, startDate: null, endDate: null },
    wetCough: { isPresent: false, startDate: null, endDate: null },
    diarrhea: { isPresent: false, startDate: null, endDate: null },
    abdominalPain: { isPresent: false, startDate: null, endDate: null },
  },
  location: null,
  email: null,
  birthMonth: null,
  birthYear: null,
  address: undefined,
  phoneNumber: null,
  tested: undefined,
  numTimesTested: null,
  testedPositive: undefined,
  seenPhysician: undefined,
  doctorDiagnosis: undefined,
  hasAgreedToTerms: false,
};

const reducer = (
  state: SymptomForm,
  action: SubmissionFormAction
): SymptomForm => {
  const newForm = { ...state };
  switch (action.type) {
    case 'TOGGLE_SYMPTOM':
      newForm.symptoms[action.payload].isPresent = !state.symptoms[
        action.payload
      ].isPresent;
      return newForm;
    case 'SET_SYMPTOM_START_DATE':
      newForm.symptoms[action.payload.symptom].startDate =
        action.payload.startDate;
      return newForm;
    case 'SET_SYMPTOM_END_DATE':
      newForm.symptoms[action.payload.symptom].endDate = action.payload.endDate;
      return newForm;
    case 'SET_NUM_TIMES_TESTED':
      return { ...state, numTimesTested: action.payload };
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    case 'SET_TESTED':
      if (action.payload === false) {
        return { ...state, testedPositive: undefined, tested: action.payload };
      }
      return {
        ...state,
        tested: action.payload,
        numTimesTested: null,
        seenPhysician: undefined,
        doctorDiagnosis: undefined,
      };
    case 'SET_TESTED_POSITIVE':
      return { ...state, testedPositive: action.payload };
    case 'SET_SEEN_PHYSICIAN':
      return { ...state, seenPhysician: action.payload };
    case 'SET_DOCTOR_DIAGNOSIS':
      if (
        action.payload === 'suspected' ||
        action.payload === 'inconclusive' ||
        action.payload === 'negative'
      ) {
        return { ...state, doctorDiagnosis: action.payload };
      }
      return newForm;
    case 'TOGGLE_AGREED':
      return { ...state, hasAgreedToTerms: !state.hasAgreedToTerms };
    case 'SET_USER_DATA': // e.g. pre-populating symptoms form
      return {
        ...action.payload,
      };
    case 'RESET_SYMPTOMS':
      return {
        ...state,
        symptoms: initialUserState.symptoms,
      };
    default:
      return state;
  }
};

export const UserContext = createContext<{ state: any; dispatch: any }>({
  state: null,
  dispatch: null,
});

export type FormProviderType = {
  children: React.ReactNode;
};

export const UserProvider: FC<FormProviderType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);

  // to avoid rerunning login trigger
  const [authFlag, setAuthFlag] = useState<boolean>(true);

  const [user] = useAuthState(firebase.auth());

  // when user logs in, fetch data from backend
  if (user) {
    if (authFlag) {
      setAuthFlag(false);
      user.getIdToken().then(token => {
        getUserData(token)
          .then((resp: any) => {
            if (resp.status === 200 && resp.body) {
              console.log(resp.body.data);
              dispatch({ type: 'SET_USER_DATA', payload: resp.body.data });
            }
          })
          .catch((resp: any) => {
            // handle error
          });
      });

      console.log('you are logged in!');
    }
  }

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
