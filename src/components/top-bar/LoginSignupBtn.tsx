import React, { FC, useContext } from 'react';
import { Button, IconButton } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import { MuiClassList } from 'types/top-bar';
import { GlobalContext } from 'components';

const LoginSignupBtnDesktop: FC<MuiClassList> = ({ classes }) => {
  const { dispatch } = useContext(GlobalContext);

  return (
    <IconButton
      aria-label="login-or-signup"
      className={classes.signupLoginMobile}
      color="primary"
      size="small"
      onClick={() => {
        dispatch({
          type: 'TOGGLE_LOGIN_SIGNUP_MODAL',
          payload: 'login',
        });
      }}
    >
      <PersonOutlineIcon fontSize="inherit" htmlColor="white" />
    </IconButton>
  );
};

const LoginSignupBtnMobile: FC<MuiClassList> = ({ classes }) => {
  const { dispatch } = useContext(GlobalContext);

  return (
    <Button
      variant="contained"
      color="primary"
      className={`${classes.appBarBtns} ${classes.signupLoginBtn} ${classes.snugBtnMobile}`}
      onClick={() => {
        dispatch({
          type: 'TOGGLE_LOGIN_SIGNUP_MODAL',
          payload: 'login',
        });
      }}
    >
      Login / Signup
    </Button>
  );
};

export const LoginSignupBtn: FC<MuiClassList> = ({ classes }) => (
  <>
    <LoginSignupBtnDesktop classes={classes} />
    <LoginSignupBtnMobile classes={classes} />
  </>
);
