import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { isValidUserAgent } from 'utils';
import { UnsupportedBrowserMsg } from 'components';
import { SignupForm } from 'components/signup';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.grey['500'],
  },
}));

export const Signup = () => {
  const classes = useStyles();

  if (!isValidUserAgent()) {
    return <UnsupportedBrowserMsg />;
  }

  return (
    <>
      <SignupForm />
      <Link to="/login" className={classes.link}>
        Already have an account?
      </Link>
    </>
  );
};
