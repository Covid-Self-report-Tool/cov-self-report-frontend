import React from 'react';
import { Grid } from '@material-ui/core';
import { SignupForm } from 'components';

export const Signup = () => {
  return (
    <Grid container item xs={12} justify="center">
      <SignupForm />
    </Grid>
  );
};
