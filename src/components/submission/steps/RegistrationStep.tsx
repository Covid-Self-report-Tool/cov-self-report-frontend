import React, { FC, useState, useReducer } from 'react';
import {
  DialogTitle,
  DialogContent,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
  Button,
  makeStyles,
} from '@material-ui/core';
import { IfFirebaseUnAuthed, IfFirebaseAuthed } from '@react-firebase/auth';

import { SymptomForm, DispatchFormType } from 'context/types';
import { SignupFields } from 'components/signup/SignupFields';
import { formReducer, initialFormState } from 'components/signup';

const useStyles = makeStyles({
  marginTop: {
    marginTop: 20,
  },
});

type RegistrationStepType = {
  formState: SymptomForm;
  dispatchForm: DispatchFormType;
};

export const RegistrationStep: FC<RegistrationStepType> = ({
  formState,
  dispatchForm,
}) => {
  const classes = useStyles();
  const [hasChosenRegistration, setHasChosenRegistration] = useState<Boolean>(
    false
  );

  const [state, dispatch] = useReducer(formReducer, initialFormState);

  return (
    <div>
      <IfFirebaseUnAuthed>
        {() => (
          <>
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
              {!hasChosenRegistration ? (
                <Grid container>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={() => setHasChosenRegistration(true)}
                    >
                      Email
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" className={classes.marginTop}>
                      Google
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid container>
                  <Grid item xs={12} style={{ overflow: 'hidden' }}>
                    <SignupFields state={state} dispatch={dispatch} />
                  </Grid>
                </Grid>
              )}
            </DialogContent>
          </>
        )}
      </IfFirebaseUnAuthed>
      <IfFirebaseAuthed>
        {() => (
          <div>
            <DialogTitle>Terms</DialogTitle>
            <DialogContent>
              <IfFirebaseAuthed>
                {({ user }) => <span>Logged in as {user.email}</span>}
              </IfFirebaseAuthed>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkedB"
                      color="primary"
                      checked={!!formState.hasAgreedToTerms}
                      onChange={() => {
                        dispatchForm({ type: 'TOGGLE_AGREED' });
                      }}
                    />
                  }
                  label={
                    <span>
                      I agree to the{' '}
                      <Link
                        href="/terms-of-service"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms of service
                      </Link>
                      .
                    </span>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View privacy policy
                </Link>
              </Grid>
            </DialogContent>
          </div>
        )}
      </IfFirebaseAuthed>
    </div>
  );
};
