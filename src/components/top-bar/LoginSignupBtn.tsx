import React, { FC } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Button, IconButton } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import { MuiClassList } from 'types/top-bar';

const LoginSignupBtnDesktop: FC<MuiClassList> = ({ classes }) => (
  <IconButton
    aria-label="login-or-signup"
    className={classes.signupLoginMobile}
    color="primary"
    size="small"
    component={RouteLink}
    to="/login"
  >
    <PersonOutlineIcon fontSize="inherit" htmlColor="white" />
  </IconButton>
);

const LoginSignupBtnMobile: FC<MuiClassList> = ({ classes }) => (
  <Button
    variant="contained"
    color="primary"
    className={`${classes.appBarBtns} ${classes.signupLoginBtn} ${classes.snugBtnMobile}`}
    component={RouteLink}
    to="/login"
  >
    Login / Signup
  </Button>
);

export const LoginSignupBtn: FC<MuiClassList> = ({ classes }) => (
  <>
    <LoginSignupBtnDesktop classes={classes} />
    <LoginSignupBtnMobile classes={classes} />
  </>
);
