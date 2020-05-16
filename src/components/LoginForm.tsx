import React, { FC, useState, useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AccountCircle, Https, Facebook, Email } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { googleLogin, login, facebookLogin } from 'utils/firebase';
import { GlobalContext } from 'context';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.info.main,
    textDecoration: 'none',
  },
  marginTop: {
    marginTop: theme.spacing(1),
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
    <>
      <Grid container spacing={2} justify="center">
        <Grid item xs={10} sm={7} className={classes.marginTop}>
          <TextField
            id="username"
            label="Username"
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={!!emailErrorMessage}
            helperText={emailErrorMessage}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={10} sm={7} className={classes.marginTop}>
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Https />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
          />
          <Link to="/verify_email" className={classes.link}>
            Forgot password?
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        className={classes.marginTop}
        spacing={1}
      >
        <Grid item xs={12} sm="auto" style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleLogin}
            startIcon={<Email />}
            disabled={!email || !password}
          >
            Login with email
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleGoogleLogin}
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 210 210"
                className="MuiSvgIcon-root"
              >
                <path d="M0 105a105.1 105.1 0 01169-83.2l-24.4 31.7a65 65 0 1022.2 71.5H105V85h105v20a105.1 105.1 0 01-210 0z" />
              </svg>
            }
          >
            Google login
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ textTransform: 'none' }}
            startIcon={<Facebook />}
            onClick={handleFacebookLogin}
          >
            Facebook login
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
