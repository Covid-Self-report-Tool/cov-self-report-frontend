import React, { FC, useContext } from 'react';
import { Link } from '@material-ui/core';

import { GlobalContext } from 'context';

export const SignInLink: FC = () => {
  const { dispatch } = useContext(GlobalContext);

  return (
    <Link
      href="#"
      className="obvious-link"
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();

        dispatch({
          type: 'TOGGLE_LOGIN_SIGNUP_MODAL',
          payload: 'login',
        });
      }}
    >
      Sign in
    </Link>
  );
};
