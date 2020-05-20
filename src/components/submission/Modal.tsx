import React, { useState, useContext, FC, useReducer } from 'react';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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
import { IfFirebaseUnAuthed } from '@react-firebase/auth';

import firebase from 'config/firebase';
import { postFormData } from 'utils/api';
import { signUp } from 'utils/firebase';
import { GlobalContext } from 'components';
import {
  SymptomStep,
  TestingStep,
  LocationDetailsStep,
  RegistrationStep,
} from 'components/submission/steps';
import { UserContext } from 'context';
import {
  formReducer,
  emailSignupFormInitialState,
  SignInLink,
} from 'components/signup';

const getSteps = () => {
  return ['Symptoms', 'Tests', 'Location', 'Submit'];
};

const useStyles = makeStyles(theme => ({
  // TODO: allow horizontal scrolling in stepper but not in the rest of modal
  stepper: {
    padding: `12px 4px ${theme.spacing(1)}px`,
  },
}));

interface ModalTypes {
  setSuccessConfOpen: React.Dispatch<boolean>;
}

export const Modal: FC<ModalTypes> = ({ setSuccessConfOpen }) => {
  const classes = useStyles();
  const history = useHistory();
  const [user] = useAuthState(firebase.auth());
  const [activeStep, setActiveStep] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    state: symptomsFormState,
    dispatch: dispatchSymptomsForm,
  } = useContext(UserContext);
  const { dispatch } = useContext(GlobalContext);
  const [signupFormState, signupFormDispatch] = useReducer(
    formReducer,
    emailSignupFormInitialState
  );
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
          symptomsFormState.seenPhysician === false ||
          symptomsFormState.testedPositive !== undefined ||
          symptomsFormState.doctorDiagnosis !== undefined
        ) {
          return false;
        }

        return true;
      case 2:
        return !symptomsFormState.location;
      case 3:
        return !signupFormState.captcha;
      default:
        return false;
    }
  };

  const submitSymptomsForm = async (firebaseUser: firebase.User | null) => {
    if (firebaseUser) {
      try {
        const idToken = await firebaseUser.getIdToken(true);
        setSubmitting(true);
        await postFormData(symptomsFormState, idToken);
        history.push('/');
        setSuccessConfOpen(true);
      } catch (err) {
        dispatch({
          type: 'TOGGLE_UI_ALERT',
          payload: {
            open: true,
            message: 'Something went wrong. Your entry was not submitted.',
            severity: 'error',
          },
        });
        setSubmitting(false);
      }
    }
  };

  const handleSignupError = (code: string, message: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        signupFormDispatch({
          type: 'SET_FIELD',
          payload: {
            field: 'emailError',
            value: 'That email is already in use',
          },
        });
        break;
      case 'auth/invalid-email':
        signupFormDispatch({
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
            duration: 15000, // it's not actually 15 seconds, more like 6 or 7
          },
        });
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      if (user) {
        await submitSymptomsForm(user);
      }
      // hasn't registered yet
      else {
        await signUp(
          signupFormState.email,
          signupFormState.password,
          signupFormState.password2
        );

        setSubmitting(true);
        const { currentUser } = firebase.auth();
        await submitSymptomsForm(currentUser);
      }
    } catch (err) {
      setSubmitting(false);
      handleSignupError(err.code, err.message);
    }
  };

  const isLastStep = () => {
    return (
      user &&
      symptomsFormState.location &&
      symptomsFormState.hasAgreedToTerms &&
      activeStep === steps.length - 1
    );
  };

  const canSubmit = () => {
    if (user) {
      return symptomsFormState.hasAgreedToTerms;
    }
    return symptomsFormState.hasAgreedToTerms && signupFormState.captcha;
  };

  const displayStep = (step: number) => {
    switch (step) {
      case 0:
        return <SymptomStep setActiveStep={setActiveStep} />;
      case 1:
        return (
          <TestingStep
            formState={symptomsFormState}
            dispatchForm={dispatchSymptomsForm}
          />
        );
      case 2:
        return <LocationDetailsStep />;
      case 3:
        return <RegistrationStep />;
      default:
        return null;
    }
  };

  // TODO: show full size on mobile
  return (
    <Dialog open aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
      <Stepper activeStep={activeStep} className={classes.stepper}>
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
        <IfFirebaseUnAuthed>
          {() => (
            <div>
              Have an account? <SignInLink />
            </div>
          )}
        </IfFirebaseUnAuthed>
        <Button size="small" to="/" component={RouteLink} color="primary">
          Cancel
        </Button>
        <Button
          size="small"
          onClick={handleBack}
          color="primary"
          disabled={activeStep === 0 || submitting}
        >
          Back
        </Button>
        {activeStep < steps.length - 1 && !isLastStep() ? (
          <Button
            size="small"
            data-cy="next-button"
            onClick={handleNext}
            color="secondary"
            variant="contained"
            disabled={isNextDisabled(activeStep)}
          >
            Next
          </Button>
        ) : (
          <Button
            size="small"
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
            data-cy="submit-button"
            disabled={!canSubmit() || submitting}
          >
            {!submitting ? 'Submit' : <CircularProgress />}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
