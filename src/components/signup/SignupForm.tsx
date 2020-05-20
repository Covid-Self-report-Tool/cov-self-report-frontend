import React, { FC, useReducer, useContext } from 'react';
import { IfFirebaseUnAuthed } from '@react-firebase/auth';
import { Grid, Typography } from '@material-ui/core';

import { googleLogin, facebookLogin } from 'utils/firebase';
import { GlobalContext } from 'components';
import { UserContext } from 'context';
import { initialFormStateType, actionType } from 'components/signup/types';
import {
  EmailSignupFields,
  AgreeToTerms,
  AcctReqExplain,
  SignupLoginBtn,
  SignInLink,
} from 'components/signup';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export const emailSignupFormInitialState = {
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
  const [, registrationFormDispatch] = useReducer(
    formReducer,
    emailSignupFormInitialState
  );
  const {
    state: symptomsFormState,
    dispatch: symptomsFormDispatch,
  } = useContext(UserContext);

  const setFormValue = (field: string, value: string) => {
    registrationFormDispatch({ type: 'SET_FIELD', payload: { field, value } });
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

  // Generic success handler to show user success alert and close modal
  const handleSignupSuccess = () => {
    dispatch({
      type: 'TOGGLE_LOGIN_SIGNUP_MODAL',
      payload: null,
    });

    dispatch({
      type: 'TOGGLE_UI_ALERT',
      payload: {
        open: true,
        message: 'Signup successful!',
        severity: 'success',
      },
    });
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
    <div style={{ textAlign: 'center' }}>
      <IfFirebaseUnAuthed>
        {() => (
          <>
            <Typography variant="h4">Choose a signup method</Typography>
            <AcctReqExplain />
            {!symptomsFormState.hasAgreedToTerms && (
              <Grid container>
                <Grid item xs={12}>
                  <AgreeToTerms
                    hasAgreedToTerms={symptomsFormState.hasAgreedToTerms}
                    dispatchForm={symptomsFormDispatch}
                  />
                </Grid>
              </Grid>
            )}
            {symptomsFormState.hasAgreedToTerms && (
              <>
                <Grid
                  container
                  justify="center"
                  style={{ marginTop: 16 }}
                  spacing={1}
                >
                  <Grid item>
                    <SignupLoginBtn
                      type="google"
                      onClick={handleGoogleLogin}
                      disabled={false}
                    />
                  </Grid>
                  <Grid item>
                    <SignupLoginBtn
                      type="facebook"
                      onClick={handleFacebookLogin}
                      disabled={false}
                    />
                  </Grid>
                </Grid>
                <Typography variant="body2">
                  <p style={{ marginTop: 16 }}>OR, sign up with email:</p>
                </Typography>
                <EmailSignupFields
                  handleSignupError={handleSignupError}
                  handleSignupSuccess={handleSignupSuccess}
                />
              </>
            )}
            <p style={{ textAlign: 'center' }}>
              Already have an account? <SignInLink /> .
            </p>
          </>
        )}
      </IfFirebaseUnAuthed>
    </div>
  );
};
