import React, { FC, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DialogTitle, DialogContent, Grid, Button } from '@material-ui/core';
import { IfFirebaseUnAuthed, IfFirebaseAuthed } from '@react-firebase/auth';

import { initialFormStateType } from 'components/signup/types';
import { UserContext } from 'context';
import {
  AgreeToTerms,
  AcctReqExplain,
  EmailSignupFields,
} from 'components/signup';

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
  const [hasChosenEmailReg, setHasChosenEmailReg] = useState<Boolean>(false);

  const SignupBtns: FC = () => (
    <Grid container spacing={1} justify="center">
      <Grid item>
        <Button
          variant="contained"
          data-cy="register-email"
          onClick={() => setHasChosenEmailReg(true)}
        >
          Email
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleGoogleLogin}>
          Google
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleFacebookLogin}>
          Facebook
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <>
      <DialogTitle className={classes.dialogTitle}>Submit</DialogTitle>
      <DialogContent dividers>
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
        </Grid>
        {formState.hasAgreedToTerms && (
          <IfFirebaseUnAuthed>
            {() => (
              <>
                <Grid container>
                  <Grid item xs={12} style={{ overflow: 'hidden' }}>
                    <EmailSignupFields
                      state={state}
                      dispatch={dispatchForm}
                      showEmailFields={hasChosenEmailReg}
                      renderSignupBtns={() => <SignupBtns />}
                      renderEmailSignupBtn={() => (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {}}
                          disabled={!Boolean(state.captcha)}
                        >
                          Sign up
                        </Button>
                      )}
                    />
                  </Grid>
                </Grid>
                <AcctReqExplain />
              </>
            )}
          </IfFirebaseUnAuthed>
        )}
      </DialogContent>
    </>
  );
};
