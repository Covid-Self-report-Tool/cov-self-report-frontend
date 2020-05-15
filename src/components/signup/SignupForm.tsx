import React, { FC, useReducer, useContext } from 'react';
import { useHistory } from 'react-router';
import { Paper, Grid, Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { signUp, googleLogin, facebookLogin } from 'utils/firebase';

import { GlobalContext } from 'components';
import { initialFormStateType, actionType } from 'components/signup/types';
import { SignupFields } from './SignupFields';

const useStyles = makeStyles((theme: Theme) => ({
  padding: {
    padding: theme.spacing(2),
  },
}));

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export const initialFormState = {
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
  const history = useHistory();
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
            duration: 15000,
          },
        });
        break;
    }
  };

  // Generic success handler: show user success alert, go to home route
  const handleSignupSuccess = () => {
    history.push('/');

    dispatch({
      type: 'TOGGLE_UI_ALERT',
      payload: {
        open: true,
        message: 'Signup successful!',
        severity: 'success',
      },
    });
  };

  const handleEmailSignup = async () => {
    dispatchForm({ type: 'RESET_FORM_ERRORS' });

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
      try {
        await signUp(state.email, state.password, state.captcha);
        handleSignupSuccess();
      } catch (err) {
        handleSignupError(err.code, err.message);
      }
    }
  };

  // Technically signup OR login
  const handleGoogleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      await googleLogin();
      handleSignupSuccess();
    } catch (err) {
      handleSignupError(err.code, err.message);
    }
  };

  // Technically signup OR login
  const handleFacebookLogin = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await facebookLogin();
      handleSignupSuccess();
    } catch (err) {
      handleSignupError(err.code, err.message);
    }
  };

  return (
    <Paper className={classes.padding}>
      <>
        <SignupFields state={state} dispatch={dispatchForm} />
        <Grid container justify="center" style={{ marginTop: '20px' }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none', marginRight: '20px' }}
            onClick={handleEmailSignup}
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
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none', marginRight: '20px' }}
            onClick={handleFacebookLogin}
          >
            Login with Facebook
          </Button>
        </Grid>
      </>
    </Paper>
  );
};
