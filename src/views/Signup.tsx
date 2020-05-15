import React from 'react';

import { SimpleModal } from 'components';
import { SignupForm } from 'components/signup';

export const Signup = () => (
  <SimpleModal
    title="Sign up"
    leftSideLink={{
      text: 'Already have an account?',
      to: '/login',
    }}
  >
    <SignupForm />
  </SimpleModal>
);
