import React, { useState, useContext, FC } from 'react';
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
import firebase from 'config/firebase';
import { postFormData } from 'utils/api';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GlobalContext } from 'components';
import {
  SymptomStep,
  TestingStep,
  LocationDetailsStep,
  RegistrationStep,
} from 'components/submission/steps';
import { UserContext } from 'context';

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
      setSubmitting(true);
      user.getIdToken(true).then(idToken => {
        postFormData(formState, idToken)
          .then((res: any) => {
            setSubmitting(false);
            history.push('/');
            setSuccessConfOpen(true);
          })
          .catch((err: any) => {
            setSubmitting(false);

            dispatch({
              type: 'TOGGLE_UI_ALERT',
              payload: {
                open: true,
                message: 'Something went wrong. Your entry was not submitted.',
                severity: 'error',
              },
            });

            history.push('/');
          });
      });
    }
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
          <RegistrationStep formState={formState} dispatchForm={dispatchForm} />
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
