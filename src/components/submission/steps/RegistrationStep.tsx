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
  dialogContent: {
    padding: `${theme.spacing(3)}px 10px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(4)}px ${theme.spacing(3)}px`,
    },
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

  return (
    <>
      <DialogTitle className={classes.dialogTitle}>Submit</DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
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
                <Grid container style={{ textAlign: 'center' }}>
                  <Grid item xs={12} style={{ overflow: 'hidden' }}>
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
