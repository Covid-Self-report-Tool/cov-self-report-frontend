import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SignupForm } from 'components';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '40px',
  },
  link: {
    color: theme.palette.grey['500'],
  },
}));

export const Signup = () => {
  const classes = useStyles();

  return (
    <>
      <SignupForm />
      <Link to="/login" className={classes.link}>
        Already have an account?
      </Link>
    </>
  );
};
