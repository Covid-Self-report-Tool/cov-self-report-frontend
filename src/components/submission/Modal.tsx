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
  LocationDetailsStep,
  RegistrationStep,
} from 'components/submission/steps';

const getSteps = () => {
  return ['Symptoms', 'Location', 'Submit'];
};

const initialFormState: SymptomForm = {
  symptoms: {
    fever: { isPresent: false },
    headache: { isPresent: false },
    shortnessOfBreath: { isPresent: false },
    reducedSmell: { isPresent: false },
    reducedTaste: { isPresent: false },
    runnyNose: { isPresent: false },
    wheezing: { isPresent: false },
    chestPain: { isPresent: false },
    bodyAche: { isPresent: false },
    lightHeadedness: { isPresent: false },
    confusion: { isPresent: false },
    fatigue: { isPresent: false },
    soreThroat: { isPresent: false },
    nausea: { isPresent: false },
    dryCough: { isPresent: false },
    wetCough: { isPresent: false },
    diarrhea: { isPresent: false },
    abdominalPain: { isPresent: false },
  },
  location: null,
  email: null,
  birthMonth: null,
  birthYear: null,
  address: undefined,
  phoneNumber: null,
  numTimesTested: null,
  testedPositive: null,
  seenADoctor: null,
  doctorSuspects: null,
  doctorInconclusive: null,
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
      return newForm;
    case 'SET_SYMPTOM_END_DATE':
      return newForm;
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };
    case 'TOGGLE_AGREED':
      return { ...state, hasAgreedToTerms: !state.hasAgreedToTerms };
    default:
      return state;
  }
};

export const Modal = () => {
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

  const submitForm = () => {
    if (user) {
      user.getIdToken(true).then(idToken => {
        postFormData(formState, idToken)
          .then((res: any) => {
            console.log(`got back ${res}`);
            history.push('/');
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
          <LocationDetailsStep
            formState={formState}
            dispatchForm={dispatchForm}
          />
        );
      case 2:
        return (
          <RegistrationStep formState={formState} dispatchForm={dispatchForm} />
        );
      default:
        return <></>;
    }
  };

  return (
    <Dialog open aria-labelledby="form-dialog-title" fullWidth maxWidth="xs">
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
        {activeStep < 2 ? (
          <Button
            onClick={handleNext}
            color="primary"
            disabled={activeStep === 1 && !formState.location}
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
