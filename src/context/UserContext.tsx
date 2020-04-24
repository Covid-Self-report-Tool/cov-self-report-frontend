import React, {
  useContext,
  createContext,
  useReducer,
  useState,
  FC,
  useEffect,
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'config/firebase';

import { getUserData } from 'utils/api';
import { SymptomForm, SubmissionFormAction } from 'context/types';
import { onAuthStateChange } from 'utils/firebase';
import { GlobalContext } from 'components';

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
  city: null,
  state: null,
  county: null,
  country: null,
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
    case 'SET_BIRTH_DATE':
      return {
        ...state,
        birthMonth: action.payload.birthMonth,
        birthYear: action.payload.birthYear,
      };
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
    case 'SET_ADDRESS_COMPONENTS':
      return {
        ...state,
        ...action.payload,
      };
    case 'RESET_SYMPTOMS':
      return {
        ...state,
        symptoms: initialUserState.symptoms,
      };
    case 'RESET_USER_DATA':
      return {
        ...initialUserState,
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
  const { dispatch: dispatchGlobal } = useContext(GlobalContext);

  // to avoid rerunning login trigger
  const [authFlag, setAuthFlag] = useState<boolean>(true);

  const [user] = useAuthState(firebase.auth());

  useEffect(() => {
    onAuthStateChange(({ loggedIn }: { loggedIn: boolean }) => {
      if (loggedIn && user && authFlag) {
        setAuthFlag(false);
        user.getIdToken().then(token => {
          getUserData(token)
            .then((resp: any) => {
              if (resp.status === 200 && resp.body) {
                dispatch({ type: 'SET_USER_DATA', payload: resp.body.data });
              }
            })
            .catch(() => {
              dispatchGlobal({
                type: 'TOGGLE_UI_ALERT',
                payload: {
                  open: true,
                  message: 'Something went wrong. Could not get your data.',
                  severity: 'error',
                },
              });
            });
        });
      }
    });
  }, [user, authFlag]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
