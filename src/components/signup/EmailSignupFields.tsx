import React, { FC, useEffect, useContext, useState, useReducer } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  InputAdornment,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { AccountCircle, Email, Https } from '@material-ui/icons';

import firebase from 'config/firebase';
import { signUp } from 'utils/firebase';
import { GlobalContext } from 'context';
import { emailSignupFormInitialState, formReducer } from 'components/signup';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  marginTop: {
    marginTop: theme.spacing(1),
  },
}));

type EmailSignupFieldsType = {
  handleSignupError: (code: string, message: string) => void;
  handleSignupSuccess: () => void;
};

export const EmailSignupFields: FC<EmailSignupFieldsType> = ({
  handleSignupError,
  handleSignupSuccess,
}) => {
  const classes = useStyles();
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { dispatch: dispatchGlobal } = useContext(GlobalContext);
  const [formState, dispatchForm] = useReducer(
    formReducer,
    emailSignupFormInitialState
  );

  const setFormValue = (field: string, value: string) => {
    dispatchForm({ type: 'SET_FIELD', payload: { field, value } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.currentTarget.name, e.currentTarget.value);
  };

  // Basic form validation for email fields
  const handleEmailSignup = async () => {
    dispatchForm({ type: 'RESET_FORM_ERRORS' });

    if (formState.password.length < 6) {
      setFormValue(
        'passwordError',
        'Password must be at least 6 characters long'
      );
    } else if (formState.password2.length < 6) {
      setFormValue(
        'passwordError2',
        'Password must be at least 6 characters long'
      );
    } else if (formState.password !== formState.password2) {
      setFormValue('passwordError2', 'Passwords do not match');
    } else {
      try {
        setSubmitting(true);
        await signUp(formState.email, formState.password, formState.captcha);
        handleSignupSuccess();
      } catch (err) {
        setSubmitting(false);
        handleSignupError(err.code, err.message);
      }
    }
  };

  useEffect(() => {
    try {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha',
        {
          callback: (response: any) => {
            setFormValue('captcha', response);
            setCaptchaVerified(true);
          },
          'expired-callback': () => {
            window.recaptchaVerifier.clear();
            // Response expired. Needs to rerender captcha
          },
        }
      );
      window.recaptchaVerifier.render();
    } catch (err) {
      dispatchGlobal({
        type: 'TOGGLE_UI_ALERT',
        payload: {
          open: true,
          message: 'Something went wrong. Could not load captcha.',
          severity: 'error',
        },
      });
    }
  }, [dispatchGlobal]);

  return (
    <>
      <div
        id="recaptcha"
        style={{ display: !captchaVerified ? 'inline-block' : 'none' }}
      />
      <div style={{ display: !captchaVerified ? 'none' : 'block' }}>
        <Grid
          container
          spacing={2}
          className={classes.marginTop}
          justify="center"
        >
          <Grid item xs={12} sm={6}>
            <TextField
              id="email"
              label="Email"
              type="email"
              name="email"
              data-cy="register-email-field"
              value={formState.email}
              onChange={handleChange}
              error={!!formState.emailError}
              helperText={formState.emailError}
              fullWidth
              required
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          className={classes.marginTop}
          justify="center"
        >
          <Grid item xs={6} sm={3}>
            <TextField
              id="password"
              label="Password"
              type="password"
              name="password"
              data-cy="register-password-field"
              value={formState.password}
              onChange={handleChange}
              fullWidth
              required
              error={!!formState.passwordError}
              helperText={formState.passwordError}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Https />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              id="password2"
              label="Confirm Password"
              type="password"
              name="password2"
              data-cy="register-password2-field"
              value={formState.password2}
              onChange={handleChange}
              fullWidth
              required
              error={!!formState.passwordError2}
              helperText={formState.passwordError2}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Https />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button
              variant="contained"
              data-cy={'register-email'}
              color="secondary"
              disabled={!captchaVerified}
              startIcon={<Email />}
              onClick={handleEmailSignup}
            >
              {!submitting ? 'Sign up with email' : <CircularProgress />}
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
