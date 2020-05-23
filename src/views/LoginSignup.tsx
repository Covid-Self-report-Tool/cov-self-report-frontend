import React, { useContext, FC } from 'react';

import { GlobalContext, SimpleModal } from 'components';
import { LoginForm } from 'components/LoginForm';
import { SignupForm } from 'components/signup';

export const LoginSignup: FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const modalView = state.loginSignupModal;

  const onClose = () => {
    dispatch({
      type: 'TOGGLE_LOGIN_SIGNUP_MODAL',
      payload: null,
    });
  };

  if (!modalView) {
    return null;
  }

  if (modalView === 'login') {
    return (
      <SimpleModal onClose={onClose} title="Login">
        <LoginForm />
      </SimpleModal>
    );
  }

  return (
    <SimpleModal onClose={onClose} title="Signup">
      <SignupForm />
    </SimpleModal>
  );
};
