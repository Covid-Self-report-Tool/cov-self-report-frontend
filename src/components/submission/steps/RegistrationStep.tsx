import React, { FC } from 'react';
import {
  DialogTitle,
  DialogContent,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
} from '@material-ui/core';
import { IfFirebaseUnAuthed, IfFirebaseAuthed } from '@react-firebase/auth';

import { SignupForm } from 'components/signup';
import { SymptomForm, DispatchFormType } from 'context/types';

type RegistrationStepType = {
  formState: SymptomForm;
  dispatchForm: DispatchFormType;
};

export const RegistrationStep: FC<RegistrationStepType> = ({
  formState,
  dispatchForm,
}) => {
  return (
    <div>
      <IfFirebaseUnAuthed>
        {() => (
          <>
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
              <SignupForm />
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
