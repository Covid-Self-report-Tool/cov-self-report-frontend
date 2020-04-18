import React from 'react';
import { LoginForm } from 'components/LoginForm';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    margin: '40px',
  },
});
export const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container item xs={12} justify="center" className={classes.root}>
      <LoginForm
        onLogin={() => {
          history.push('/');
        }}
      />
    </Grid>
  );
};
