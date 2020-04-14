import React, { useState, useReducer } from 'react';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';
import firebase from 'firebase';
import { SymptomForm, SubmissionFormAction } from 'types/submission';
import { postFormData } from 'utils/api';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  SymptomStep,
  TestingStep,
  LocationDetailsStep,
  RegistrationStep,
} from 'components/submission/steps';

const getSteps = () => {
  return ['Symptoms', 'Tests', 'Location', 'Submit'];
};

const initialFormState: SymptomForm = {
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
    default:
      return state;
  }
};

interface ModalTypes {
  setSnackbarOpen: React.Dispatch<boolean>;
}

export const Modal = (props: ModalTypes) => {
  const { setSnackbarOpen } = props;
  const [user] = useAuthState(firebase.auth());
  const [activeStep, setActiveStep] = useState<number>(0);

  const [formState, dispatchForm] = useReducer(reducer, initialFormState);

  const history = useHistory();

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // logic for handling when you can click next, depending on the step
  const isNextDisabled = (step: number): boolean => {
    switch (step) {
      case 1:
        // All the last steps of this form
        if (
          formState.seenPhysician === false ||
          formState.testedPositive !== undefined ||
          formState.doctorDiagnosis !== undefined
        ) {
          return false;
        }

        return true;
      case 2:
        return !formState.location;
      default:
        return false;
    }
  };

  const submitForm = () => {
    if (user) {
      user.getIdToken(true).then(idToken => {
        postFormData(formState, idToken)
          .then((res: any) => {
            console.log(`got back ${res}`);
            history.push('/');
            setSnackbarOpen(true);
          })
          .catch((err: any) => {
            console.error(err);
            history.push('/');
          });
      });
    }
  };

  const displayStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <SymptomStep formState={formState} dispatchForm={dispatchForm} />
        );
      case 1:
        return (
          <TestingStep formState={formState} dispatchForm={dispatchForm} />
        );
      case 2:
        return (
          <LocationDetailsStep
            formState={formState}
            dispatchForm={dispatchForm}
          />
        );
      case 3:
        return (
          <RegistrationStep formState={formState} dispatchForm={dispatchForm} />
        );
      default:
        return <></>;
    }
  };

  return (
    <Dialog open aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
      <Stepper activeStep={activeStep}>
        {steps.map(label => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {displayStep(activeStep)}
      <DialogActions>
        <Button to="/" component={RouteLink} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleBack}
          color="primary"
          disabled={activeStep === 0}
        >
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button
            onClick={handleNext}
            color="primary"
            disabled={isNextDisabled(activeStep)}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={submitForm}
            color="primary"
            disabled={!user || !formState.hasAgreedToTerms}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
