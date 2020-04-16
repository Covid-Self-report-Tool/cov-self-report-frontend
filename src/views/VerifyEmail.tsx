import React from 'react';
import { Grid } from '@material-ui/core';
import { VerifyEmailForm } from 'components/VerifyEmailForm';

export const VerifyEmail = () => {
  return (
    <Grid container item xs={12} justify="center">
      <VerifyEmailForm />
    </Grid>
  );
};
