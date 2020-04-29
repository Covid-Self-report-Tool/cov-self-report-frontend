import React, { FC, useState } from 'react';
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
import { googleLogin, login } from 'utils/firebase';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.grey['500'],
  },
  padding: {
    padding: '20px',
  },
}));

type LoginFormType = {
  onLogin?: Function;
};

export const LoginForm: FC<LoginFormType> = ({ onLogin }) => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const handleLoginError = (code: string, message: string) => {
    switch (code) {
      case 'auth/wrong-password':
        setPasswordError(true);
        setPasswordErrorMessage('Invalid password');
        break;
      case 'auth/user-not-found':
        setEmailError(true);
        setEmailErrorMessage('That username does not exist');
        break;
      case 'auth/invalid-email':
        setEmailError(true);
        setEmailErrorMessage('Invalid email');
        break;
      default:
        alert(message); // change to flash message
        break;
    }
  };

  const resetErrors = () => {
    setEmailError(false);
    setPasswordError(false);
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
  };

  const handleLogin = (event: React.MouseEvent) => {
    event.preventDefault();

    resetErrors();
    if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long');
    } else {
      login(email, password)
        .then(resp => {
          if (onLogin) {
            onLogin(resp);
          }
        })
        .catch(err => {
          handleLoginError(err.code, err.message);
        });
    }
  };

  const handleGoogleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    googleLogin()
      .then(resp => {
        if (onLogin) {
          onLogin(resp);
        }
      })
      .catch(err => {
        handleLoginError(err.code, err.message); // how to handle Google errors?
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Paper className={classes.padding}>
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
              error={emailError}
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
              error={passwordError}
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
              Forgot password ?
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
            style={{ textTransform: 'none' }}
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};
