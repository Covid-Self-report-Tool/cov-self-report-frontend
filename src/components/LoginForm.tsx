import React, { FC, useState, useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Link,
} from '@material-ui/core';
import { AccountCircle, Https, Email } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { googleLogin, login, facebookLogin } from 'utils/firebase';
import { GlobalContext } from 'context';
import { SimpleModal, VerifyEmailForm } from 'components';
import { SignupLoginBtn } from 'components/signup';

const useStyles = makeStyles(theme => ({
  marginTop: {
    marginTop: theme.spacing(1),
  },
}));

export const LoginForm: FC = () => {
  const classes = useStyles();
  const { dispatch } = useContext(GlobalContext);

  const [showForgotPasswd, setShowForgotPasswd] = useState<boolean>(false);
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
        await login(email, password);
      } catch (err) {
        handleLoginError(err.code, err.message);
      }
    }
  };

  const handleGoogleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      await googleLogin();
    } catch (err) {
      handleLoginError(err.code, err.message);
    }
  };

  const handleFacebookLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      await facebookLogin();
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
      <Typography variant="h4">Choose a login method</Typography>
      <Grid
        container
        spacing={2}
        justify="center"
        className={classes.marginTop}
      >
        <Grid item>
          <SignupLoginBtn type="google" onClick={handleGoogleLogin} />
        </Grid>
        <Grid item>
          <SignupLoginBtn type="facebook" onClick={handleFacebookLogin} />
        </Grid>
      </Grid>
      <Typography variant="body2" className={classes.marginTop} align="center">
        <p>OR, sign up with email:</p>
      </Typography>
      <Grid container spacing={2} justify="center">
        <Grid item xs={10} sm={4} className={classes.marginTop}>
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
      </Grid>
      <Grid container spacing={2} justify="center">
        <Grid item xs={10} sm={4} className={classes.marginTop}>
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
      </Grid>
      <Grid container spacing={2} justify="center">
        <Grid item xs={10} sm={4}>
          <Link
            href="#"
            className="obvious-link"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              setShowForgotPasswd(true);
              return null;
            }}
          >
            Forgot password?
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        className={classes.marginTop}
        spacing={1}
        style={{ textAlign: 'center' }}
      >
        <Grid item xs={12} sm="auto">
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
      </Grid>
      <p>
        Don't have an account?{' '}
        <Link
          href="#"
          className="obvious-link"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();

            dispatch({
              type: 'TOGGLE_LOGIN_SIGNUP_MODAL',
              payload: 'signup',
            });
          }}
        >
          Sign up
        </Link>
        .
      </p>
      {showForgotPasswd && (
        <SimpleModal
          title="Forgot password"
          onClose={() => {
            setShowForgotPasswd(false);
            return null;
          }}
        >
          <VerifyEmailForm />
        </SimpleModal>
      )}
    </>
  );
};
