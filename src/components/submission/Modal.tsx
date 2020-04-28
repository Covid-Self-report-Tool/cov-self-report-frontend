import React, { useState, useContext, FC, useReducer } from 'react';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from 'config/firebase';
import { postFormData } from 'utils/api';
import { GlobalContext } from 'components';
import {
  SymptomStep,
  TestingStep,
  LocationDetailsStep,
  RegistrationStep,
} from 'components/submission/steps';
import { UserContext } from 'context';
import { formReducer, initialFormState } from 'components/signup';
import { signUp } from 'utils/firebase';

const getSteps = () => {
  return ['Symptoms', 'Tests', 'Location', 'Submit'];
};

interface ModalTypes {
  setSuccessConfOpen: React.Dispatch<boolean>;
}

export const Modal: FC<ModalTypes> = ({ setSuccessConfOpen }) => {
  const [user] = useAuthState(firebase.auth());
  const [activeStep, setActiveStep] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { state: formState, dispatch: dispatchForm } = useContext(UserContext);
  const { dispatch } = useContext(GlobalContext);
  const [registrationState, registrationDispatch] = useReducer(
    formReducer,
    initialFormState
  );

  const history = useHistory();

  const steps = getSteps();

  const handleNext = () => {
    // Next button on registration acts as signup
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
      case 3:
        return !registrationState.captcha;
      default:
        return false;
    }
  };

  const submitForm = (firebaseUser: firebase.User | null) => {
    if (firebaseUser) {
      firebaseUser.getIdToken(true).then(idToken => {
        setSubmitting(true);
        postFormData(formState, idToken)
          .then((res: any) => {
            history.push('/');
            setSuccessConfOpen(true);
          })
          .catch((err: any) => {
            dispatch({
              type: 'TOGGLE_UI_ALERT',
              payload: {
                open: true,
                message: 'Something went wrong. Your entry was not submitted.',
                severity: 'error',
              },
            });
            setSubmitting(false);

            history.push('/');
          });
      });
    }
  };

  const handleSignupError = (code: string, message: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        registrationDispatch({
          type: 'SET_FIELD',
          payload: {
            field: 'emailError',
            value: 'That email is already in use',
          },
        });
        break;
      case 'auth/invalid-email':
        registrationDispatch({
          type: 'SET_FIELD',
          payload: {
            field: 'emailError',
            value: 'Invalid email',
          },
        });
        break;
      // I don't know why this is an error in the first place
      case 'auth/cancelled-popup-request':
        break;
      default:
        dispatch({
          type: 'TOGGLE_UI_ALERT',
          payload: {
            open: true,
            message,
            severity: 'error',
          },
        });
        break;
    }
  };

  const handleSubmit = () => {
    if (user) {
      submitForm(user);
    }
    // hasn't registered yet
    else {
      signUp(
        registrationState.email,
        registrationState.password,
        registrationState.password2
      )
        .then(() => {
          setSubmitting(true);
          const { currentUser } = firebase.auth();
          submitForm(currentUser);
        })
        .catch(err => {
          setSubmitting(false);
          handleSignupError(err.code, err.message);
        });
    }
  };

  const isLastStep = () => {
    return (
      user &&
      formState.location &&
      formState.hasAgreedToTerms &&
      activeStep === steps.length - 1
    );
  };

  const displayStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <SymptomStep
            formState={formState}
            dispatchForm={dispatchForm}
            setActiveStep={setActiveStep}
          />
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
          <RegistrationStep
            formState={formState}
            dispatchForm={dispatchForm}
            state={registrationState}
            dispatch={registrationDispatch}
          />
        );
      default:
        return null;
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
          disabled={activeStep === 0 || submitting}
        >
          Back
        </Button>
        {activeStep < steps.length - 1 && !isLastStep() ? (
          <Button
            onClick={handleNext}
            color="primary"
            disabled={isNextDisabled(activeStep)}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            color="primary"
            // can't submit until you've both logged in AND agreed to terms
            disabled={!formState.hasAgreedToTerms || submitting}
          >
            {!submitting ? 'Submit' : <CircularProgress />}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
