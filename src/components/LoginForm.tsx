import React, { FC, useState, useContext } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Face, Fingerprint } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { googleLogin, login, facebookLogin } from 'utils/firebase';
import { GlobalContext } from 'context';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.info.main,
  },
  paper: {
    padding: 20,
  },
}));

type LoginFormType = {
  onLogin?: Function;
};

export const LoginForm: FC<LoginFormType> = ({ onLogin }) => {
  const classes = useStyles();
  const { dispatch } = useContext(GlobalContext);

  const [email, setEmail] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const handleLoginError = (code: string, message: string) => {
    switch (code) {
      case 'auth/wrong-password':
        setPasswordErrorMessage('Invalid password');
        break;
      case 'auth/user-not-found':
        setEmailErrorMessage('That username does not exist');
        break;
      case 'auth/invalid-email':
        setEmailErrorMessage('Invalid email');
        break;
      default:
        dispatch({
          type: 'TOGGLE_UI_ALERT',
          payload: {
            open: true,
            message,
            severity: 'error',
            // I think this is a MUI bug that resets the autoHide timer under
            // certain circumstances
            duration: 15000, // it's not actually 15 seconds, more like 6 or 7
          },
        });
        break;
    }
  };

  const resetErrors = () => {
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
  };

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    resetErrors();
    if (password.length < 6) {
      setPasswordErrorMessage('Password must be at least 6 characters long');
    } else {
      try {
        const resp = await login(email, password);
        if (onLogin) {
          onLogin(resp);
        }
      } catch (err) {
        handleLoginError(err.code, err.message);
      }
    }
  };

  const handleGoogleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const resp = await googleLogin();
      if (onLogin) {
        onLogin(resp);
      }
    } catch (err) {
      handleLoginError(err.code, err.message);
    }
  };

  const handleFacebookLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      const resp = await facebookLogin();
      if (onLogin) {
        await onLogin(resp);
      }
    } catch (err) {
      handleLoginError(err.code, err.message);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Paper className={classes.paper}>
      <div>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Face />
          </Grid>
          <Grid item md sm xs>
            <TextField
              id="username"
              label="Username"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={!!emailErrorMessage}
              helperText={emailErrorMessage}
              fullWidth
              autoFocus
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md sm xs>
            <TextField
              id="username"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordErrorMessage}
              helperText={passwordErrorMessage}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
          </Grid>
          <Grid item>
            <Link to="/verify_email" className={classes.link}>
              Forgot password?
            </Link>
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none', marginRight: '20px' }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none', marginRight: '20px' }}
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none' }}
            onClick={handleFacebookLogin}
          >
            Login with Facebook
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};
