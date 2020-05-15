import React from 'react';
import { LoginForm } from 'components/LoginForm';
import { useHistory } from 'react-router';

import { SimpleModal } from 'components';

export const Login = () => {
  const history = useHistory();

  return (
    <SimpleModal
      title="Login"
      leftSideLink={{
        text: "Don't have an account?",
        to: '/signup',
      }}
    >
      <LoginForm
        onLogin={() => {
          history.goBack();
        }}
      />
    </SimpleModal>
  );
};
