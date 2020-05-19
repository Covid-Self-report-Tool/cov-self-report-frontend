import React, { FC, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DialogTitle, DialogContent, Grid, Button } from '@material-ui/core';
import { IfFirebaseUnAuthed, IfFirebaseAuthed } from '@react-firebase/auth';
import { Facebook, Email } from '@material-ui/icons';

import { initialFormStateType } from 'components/signup/types';
import { UserContext } from 'context';
import {
  AgreeToTerms,
  AcctReqExplain,
  EmailSignupFields,
  SignupLoginBtns,
} from 'components/signup';

const useStyles = makeStyles(theme => ({
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
          variant="outlined"
          data-cy="register-email"
          startIcon={<Email />}
          onClick={() => setHasChosenEmailReg(true)}
        >
          Email
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={handleGoogleLogin}
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 210 210"
              className="MuiSvgIcon-root"
            >
              <path d="M0 105a105.1 105.1 0 01169-83.2l-24.4 31.7a65 65 0 1022.2 71.5H105V85h105v20a105.1 105.1 0 01-210 0z" />
            </svg>
          }
        >
          Google
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={handleFacebookLogin}
          startIcon={<Facebook />}
        >
          Facebook
        </Button>
      </Grid>
    </Grid>
  );

  const btnsConfig = {
    email: {
      onClick: () => setHasChosenEmailReg(true),
      disabled: !Boolean(state.captcha),
    },
    google: {
      onClick: handleGoogleLogin,
      disabled: !Boolean(state.captcha),
    },
    facebook: {
      onClick: handleFacebookLogin,
      disabled: !Boolean(state.captcha),
    },
  };

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
                <Grid container style={{ textAlign: 'center' }}>
                  <Grid item xs={12} style={{ overflow: 'hidden' }}>
                    <EmailSignupFields
                      state={state}
                      dispatch={dispatchForm}
                      showEmailFields={true}
                      renderSignupBtns={() => (
                        <SignupLoginBtns config={btnsConfig} />
                      )}
                      // renderEmailSignupBtn={() => <SignupWithEmailBtn />}
                      renderEmailSignupBtn={() => <div />}
                    />
                    <EmailSignupFields
                      state={state}
                      dispatch={dispatchForm}
                      showEmailFields={hasChosenEmailReg}
                      renderSignupBtns={() => (
                        <>
                          <SignupBtns />
                          <AcctReqExplain />
                        </>
                      )}
                      renderEmailSignupBtn={() => (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {}}
                          disabled={!Boolean(state.captcha)}
                        >
                          Sign up with email
                        </Button>
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      textAlign: 'center',
                      display: !Boolean(state.captcha) ? 'flex' : 'none',
                    }}
                  ></Grid>
                </Grid>
              </>
            )}
          </IfFirebaseUnAuthed>
        )}
      </DialogContent>
    </>
  );
};
