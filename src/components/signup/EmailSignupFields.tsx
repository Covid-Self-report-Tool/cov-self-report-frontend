import React, { FC, useEffect, useContext, useState, useReducer } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment, Button } from '@material-ui/core';
import { AccountCircle, Https } from '@material-ui/icons';

import firebase from 'config/firebase';
import { signUp } from 'utils/firebase';
import { GlobalContext } from 'context';
import { initialFormState, formReducer } from 'components/signup';

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
  const [captchaClicked, setCaptchaClicked] = useState(false);
  const { dispatch: dispatchGlobal } = useContext(GlobalContext);
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);

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
        await signUp(formState.email, formState.password, formState.captcha);
        handleSignupSuccess();
      } catch (err) {
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
            setCaptchaClicked(true);
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
        style={{ display: !captchaClicked ? 'block' : 'none' }}
      />
      <Grid container spacing={2} style={{ display: 'flex' }} justify="center">
        <Grid item xs={12} sm={10} className={classes.marginTop}>
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
        <Grid item xs={12} sm={5} className={classes.marginTop}>
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
        <Grid item xs={12} sm={5} className={classes.marginTop}>
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
        <Grid
          item
          xs={8}
          className={classes.marginTop}
          style={{ textAlign: 'center' }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEmailSignup}
            size="medium"
            disabled={!Boolean(formState.captcha)}
          >
            Sign up with email
          </Button>
        </Grid>
      </Grid>
      <Grid container justify="center"></Grid>
    </>
  );
};
