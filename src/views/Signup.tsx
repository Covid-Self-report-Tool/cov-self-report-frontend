import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { SignupForm } from 'components';

const useStyles = makeStyles({
  root: {
    margin: '40px',
  },
});

export const Signup = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} justify="center" className={classes.root}>
      <SignupForm />
    </Grid>
  );
};
