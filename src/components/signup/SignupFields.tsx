import React, { FC, useEffect } from 'react';
import { Grid, TextField, makeStyles } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';

import firebase from 'config/firebase';
import { initialFormStateType } from 'components/signup/types';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

const useStyles = makeStyles({
  marginTop: {
    marginTop: 20,
  },
});
type SignupFieldsType = {
  dispatch: any;
  state: initialFormStateType;
};

export const SignupFields: FC<SignupFieldsType> = props => {
  const classes = useStyles();

  const { state, dispatch } = props;

  const setFormValue = (field: string, value: string) => {
    dispatch({ type: 'SET_FIELD', payload: { field, value } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.currentTarget.name, e.currentTarget.value);
  };

  useEffect(() => {
    try {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha',
        {
          callback: (response: any) => {
            setFormValue('captcha', response);
          },
          'expired-callback': () => {
            window.recaptchaVerifier.clear();
            // Response expired. Needs to rerender captcha
          },
        }
      );
      window.recaptchaVerifier.render();
    } catch (err) {
      dispatch({
        type: 'TOGGLE_UI_ALERT',
        payload: {
          open: true,
          message: 'Something went wrong. Could not load captcha.',
          severity: 'error',
        },
      });
    }
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item>
          <Face />
        </Grid>
        <Grid item md sm xs>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={state.email}
            onChange={handleChange}
            error={!!state.emailError}
            helperText={state.emailError}
            fullWidth
            autoFocus
            required
          />
        </Grid>
      </Grid>
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item>
          <Fingerprint />
        </Grid>
        <Grid item md sm xs>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={state.password}
            onChange={handleChange}
            fullWidth
            required
            error={!!state.passwordError}
            helperText={state.passwordError}
          />
        </Grid>
      </Grid>
      <Grid container spacing={8} alignItems="flex-end">
        <Grid item>
          <Fingerprint />
        </Grid>
        <Grid item md sm xs>
          <TextField
            id="password2"
            label="Confirm Password"
            type="password"
            name="password2"
            value={state.password2}
            onChange={handleChange}
            fullWidth
            required
            error={!!state.passwordError2}
            helperText={state.passwordError2}
          />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <div className={classes.marginTop} id="recaptcha"></div>
      </Grid>
    </>
  );
};
