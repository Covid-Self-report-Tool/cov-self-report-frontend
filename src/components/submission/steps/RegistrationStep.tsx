import React, { FC, useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
} from '@material-ui/core';
import { IfFirebaseUnAuthed, IfFirebaseAuthed } from '@react-firebase/auth';

import { SignupForm, LoginForm } from 'components';
import { SymptomForm, DispatchFormType } from 'types/submission';

type RegistrationStepType = {
  formState: SymptomForm;
  dispatchForm: DispatchFormType;
};

export const RegistrationStep: FC<RegistrationStepType> = ({
  formState,
  dispatchForm,
}) => {
  const [register, setRegister] = useState<boolean>(true);

  return (
    <div>
      <IfFirebaseUnAuthed>
        {() => (
          <div>
            {register ? (
              <div>
                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                  <SignupForm />
                  <Link href="#" onClick={() => setRegister(!register)}>
                    Already a User?
                  </Link>
                </DialogContent>
              </div>
            ) : (
              <div>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                  <LoginForm />
                  <Link href="#" onClick={() => setRegister(!register)}>
                    Need to Register?
                  </Link>
                </DialogContent>
              </div>
            )}
          </div>
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
                      I Agree to the <Link href="#">Terms and Conditions</Link>
                    </span>
                  }
                />
              </Grid>
            </DialogContent>
          </div>
        )}
      </IfFirebaseAuthed>
    </div>
  );
};
