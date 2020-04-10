import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { VerifyEmailForm } from 'components/VerifyEmailForm';

const useStyles = makeStyles({
  root: {
    margin: '80px',
  },
});
export const VerifyEmail = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} justify="center" className={classes.root}>
      <VerifyEmailForm />
    </Grid>
  );
};
