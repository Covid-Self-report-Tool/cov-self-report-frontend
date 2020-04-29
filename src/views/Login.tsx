import React from 'react';
import { LoginForm } from 'components/LoginForm';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '40px',
  },
  link: {
    color: theme.palette.grey['500'],
  },
}));
export const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <LoginForm
        onLogin={() => {
          history.goBack();
        }}
      />
      <Link to="/signup" className={classes.link}>
        Don't have an account?
      </Link>
    </>
  );
};
