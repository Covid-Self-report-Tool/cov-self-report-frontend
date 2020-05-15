import React, { FC, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DialogTitle,
  DialogContent,
  Link,
  Grid,
  Button,
} from '@material-ui/core';
import { IfFirebaseUnAuthed, IfFirebaseAuthed } from '@react-firebase/auth';

import { SignupFields } from 'components/signup/SignupFields';
import { initialFormStateType } from 'components/signup/types';
import { UserContext } from 'context';
import { AgreeToTerms } from 'components/signup/AgreeToTerms';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    padding: `4px ${theme.spacing(2)}px`,
  },
  link: {
    color: theme.palette.info.main,
  },
  marginTop: {
    marginTop: 20,
  },
}));

type RegistrationStepType = {
  state: initialFormStateType;
  dispatch: any;
  handleGoogleLogin: (event: React.MouseEvent<HTMLElement>) => void;
  handleFacebookLogin: (event: React.MouseEvent<HTMLElement>) => void;
};

export const RegistrationStep: FC<RegistrationStepType> = ({
  state,
  dispatch,
  handleGoogleLogin,
  handleFacebookLogin,
}) => {
  const classes = useStyles();
  const { state: formState, dispatch: dispatchForm } = useContext(UserContext);

  const [hasChosenRegistration, setHasChosenRegistration] = useState<Boolean>(
    false
  );

  return (
    <>
      <DialogTitle className={classes.dialogTitle}>Submit</DialogTitle>
      <DialogContent dividers>
        <IfFirebaseUnAuthed>
          {() => (
            <>
              {!hasChosenRegistration ? (
                <Grid container>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      data-cy="register-email"
                      onClick={() => setHasChosenRegistration(true)}
                    >
                      Email
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleGoogleLogin}
                      className={classes.marginTop}
                    >
                      Google
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleFacebookLogin}
                      className={classes.marginTop}
                    >
                      Facebook
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
            <AgreeToTerms
              hasAgreedToTerms={formState.hasAgreedToTerms}
              dispatchForm={dispatchForm}
              classes={{ link: classes.link }}
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
