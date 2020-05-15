import React, { FC, useEffect, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment } from '@material-ui/core';
import { AccountCircle, Https } from '@material-ui/icons';

import firebase from 'config/firebase';
import { initialFormStateType } from 'components/signup/types';
import { GlobalContext } from 'context';
import { AcctReqExplain } from 'components/signup';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  marginTop: {
    marginTop: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

type SignupFieldsType = {
  dispatch: any;
  state: initialFormStateType;
};

export const SignupFields: FC<SignupFieldsType> = ({ state, dispatch }) => {
  const classes = useStyles();
  const { dispatch: dispatchGlobal } = useContext(GlobalContext);

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
      <AcctReqExplain />
      <Grid container justify="center">
        <Grid item>
          <div className={classes.marginTop} id="recaptcha"></div>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            id="email"
            label="Email"
            type="email"
            name="email"
            data-cy="register-email-field"
            value={state.email}
            onChange={handleChange}
            error={!!state.emailError}
            helperText={state.emailError}
            fullWidth
            autoFocus
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
        <Grid item xs={12} sm={6} className={classes.marginTop}>
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            data-cy="register-password-field"
            value={state.password}
            onChange={handleChange}
            fullWidth
            required
            error={!!state.passwordError}
            helperText={state.passwordError}
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
        <Grid item xs={12} sm={6} className={classes.marginTop}>
          <TextField
            id="password2"
            label="Confirm Password"
            type="password"
            name="password2"
            data-cy="register-password2-field"
            value={state.password2}
            onChange={handleChange}
            fullWidth
            required
            error={!!state.passwordError2}
            helperText={state.passwordError2}
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
      </Grid>
    </>
  );
};
