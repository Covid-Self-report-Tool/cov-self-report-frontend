import React, { FC, useState } from 'react';
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
import { initialFormStateType } from 'components/signup/types';
import { googleLogin } from 'utils/firebase';

const useStyles = makeStyles({
  marginTop: {
    marginTop: 20,
  },
});

type RegistrationStepType = {
  formState: SymptomForm;
  dispatchForm: DispatchFormType;
  state: initialFormStateType;
  dispatch: any;
};

export const RegistrationStep: FC<RegistrationStepType> = ({
  formState,
  dispatchForm,
  state,
  dispatch,
}) => {
  const classes = useStyles();
  const [hasChosenRegistration, setHasChosenRegistration] = useState<Boolean>(
    false
  );

  return (
    <>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <IfFirebaseUnAuthed>
          {() => (
            <>
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
                    <Button
                      variant="contained"
                      onClick={() => googleLogin()}
                      className={classes.marginTop}
                    >
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
            </>
          )}
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthed>
          {({ user }) => <span>Logged in as {user.email}</span>}
        </IfFirebaseAuthed>
        <Grid container>
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
        </Grid>
      </DialogContent>
    </>
  );
};
