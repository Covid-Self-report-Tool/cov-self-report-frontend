import React, { FC, useReducer, useContext } from 'react';

import { googleLogin, facebookLogin } from 'utils/firebase';
import { GlobalContext } from 'components';
import { initialFormStateType, actionType } from 'components/signup/types';
import { EmailSignupFields, SignupLoginBtns } from 'components/signup';

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
  const { dispatch } = useContext(GlobalContext);
  const [, dispatchForm] = useReducer(formReducer, initialFormState);

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

  const btnsConfig = {
    google: {
      onClick: handleGoogleLogin,
      disabled: false,
    },
    facebook: {
      onClick: handleFacebookLogin,
      disabled: false,
    },
  };

  return (
    <>
      {/* TODO: add agree to terms checkbox */}
      <SignupLoginBtns config={btnsConfig} />
      <EmailSignupFields
        handleSignupError={handleSignupError}
        handleSignupSuccess={handleSignupSuccess}
      />
    </>
  );
};
