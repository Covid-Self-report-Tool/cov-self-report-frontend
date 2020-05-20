import React, { FC, useContext } from 'react';
import { DialogTitle, DialogContent, Grid } from '@material-ui/core';
import { IfFirebaseUnAuthed, IfFirebaseAuthed } from '@react-firebase/auth';

import { initialFormStateType } from 'components/signup/types';
import { UserContext } from 'context';
import { AgreeToTerms } from 'components/signup';

type RegistrationStepType = {
  state: initialFormStateType;
  dispatch: any;
  handleGoogleLogin: (event: React.MouseEvent<HTMLElement>) => void;
  handleFacebookLogin: (event: React.MouseEvent<HTMLElement>) => void;
};

export const RegistrationStep: FC<RegistrationStepType> = () => {
  const { state: formState, dispatch: dispatchForm } = useContext(UserContext);

  return (
    <>
      <DialogTitle>Submit</DialogTitle>
      <DialogContent dividers>
        <IfFirebaseAuthed>
          {({ user }) => <span>Logged in as {user.email}</span>}
        </IfFirebaseAuthed>
        <Grid container>
          <Grid item xs={12}>
            <AgreeToTerms
              hasAgreedToTerms={formState.hasAgreedToTerms}
              dispatchForm={dispatchForm}
            />
          </Grid>
        </Grid>
        {formState.hasAgreedToTerms && (
          <IfFirebaseUnAuthed>
            {() => (
              <>
                <h2>OPEN ZEEE POPUP</h2>
              </>
            )}
          </IfFirebaseUnAuthed>
        )}
      </DialogContent>
    </>
  );
};
