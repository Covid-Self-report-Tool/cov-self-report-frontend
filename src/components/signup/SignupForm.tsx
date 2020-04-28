import React, { FC, useReducer, useEffect, useContext } from 'react';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { signUp, googleLogin } from 'utils/firebase';
import firebase from 'config/firebase';

import { GlobalContext } from 'components';
import { initialFormStateType, actionType } from 'components/signup/types';

const useStyles = makeStyles({
  padding: {
    padding: '20px',
  },
  marginTop: {
    marginTop: 20,
  },
});

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

const initialFormState = {
  email: '',
  password: '',
  password2: '',
  emailError: '',
  passwordError: '',
  passwordError2: '',
  captcha: '',
};

export const formReducer = (
  state: initialFormStateType,
  action: actionType
) => {
  switch (action.type) {
    case 'SET_FIELD':
      if (action.payload) {
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };
      }
      return {
        ...state,
      };
    case 'RESET_FORM_ERRORS':
      return {
        ...state,
        emailError: '',
        passwordError: '',
        passwordError2: '',
      };
    default:
      return { ...state };
  }
};

window.recaptchaVerifier = window.recaptchaVerifier || {};

export const SignupForm: FC = () => {
  const { dispatch } = useContext(GlobalContext);
  const classes = useStyles();
  const [state, dispatchForm] = useReducer(formReducer, initialFormState);

  const setFormValue = (field: string, value: string) => {
    dispatchForm({ type: 'SET_FIELD', payload: { field, value } });
  };

  const handleSignupError = (code: string, message: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        setFormValue('emailError', 'That email is already in use');
        break;
      case 'auth/invalid-email':
        setFormValue('emailError', 'Invalid email');
        break;
      default:
        dispatch({
          type: 'TOGGLE_UI_ALERT',
          payload: {
            open: true,
            message,
            severity: 'error',
          },
        });
        break;
    }
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

  const handleSignup = () => {
    dispatchForm({ type: 'RESET_FORM_ERRORS' });
    //resetErrors();
    if (state.password.length < 6) {
      setFormValue(
        'passwordError',
        'Password must be at least 6 characters long'
      );
    } else if (state.password2.length < 6) {
      setFormValue(
        'passwordError2',
        'Password must be at least 6 characters long'
      );
    } else if (state.password !== state.password2) {
      setFormValue('passwordError2', 'Passwords do not match');
    } else {
      // TODO: verify captcha on backend
      signUp(state.email, state.password, state.captcha).catch(err => {
        handleSignupError(err.code, err.message);
      });
    }
  };

  const handleGoogleLogin = (event: React.MouseEvent) => {
    event.preventDefault();

    googleLogin().catch(err => {
      handleSignupError(err.code, err.message);
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(event.currentTarget.name, event.currentTarget.value);
  };

  return (
    <Paper className={classes.padding}>
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
              name="email"
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
              name="password"
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
        <Grid container justify="center" style={{ marginTop: '20px' }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none', marginRight: '20px' }}
            onClick={handleSignup}
            disabled={!Boolean(state.captcha)}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none', marginRight: '20px' }}
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
          <div className={classes.marginTop} id="recaptcha"></div>
        </Grid>
      </>
    </Paper>
  );
};
