import React, { FC, useState, useContext } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Link,
  CircularProgress,
} from '@material-ui/core';
import { AccountCircle, Https, Email } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { isValidUserAgent } from 'utils';
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
  const isLegitBrowser = isValidUserAgent();

  const [showForgotPasswd, setShowForgotPasswd] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

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

  // Generic success handler to show user success alert and close modal
  const handleLoginSuccess = () => {
    dispatch({
      type: 'TOGGLE_LOGIN_SIGNUP_MODAL',
      payload: null,
    });

    dispatch({
      type: 'TOGGLE_UI_ALERT',
      payload: {
        open: true,
        message: 'Login successful!',
        severity: 'success',
      },
    });
  };

  const resetErrors = () => {
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
  };

  const handleEmailLogin = async (event: React.MouseEvent) => {
    event.preventDefault();
    resetErrors();

    try {
      setSubmitting(true);
      await login(email, password);
      handleLoginSuccess();
    } catch (err) {
      setSubmitting(false);
      handleLoginError(err.code, err.message);
    }
  };

  const handleGoogleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      await googleLogin();
      handleLoginSuccess();
    } catch (err) {
      handleLoginError(err.code, err.message);
    }
  };

  const handleFacebookLogin = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      await facebookLogin();
      handleLoginSuccess();
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
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h4">Choose a login method</Typography>
      <Grid
        container
        spacing={2}
        justify="center"
        className={classes.marginTop}
      >
        <Grid item>
          <SignupLoginBtn
            disabled={!isLegitBrowser}
            type="google"
            onClick={handleGoogleLogin}
          />
        </Grid>
        <Grid item>
          <SignupLoginBtn
            disabled={!isLegitBrowser}
            type="facebook"
            onClick={handleFacebookLogin}
          />
        </Grid>
        {!isLegitBrowser && (
          <Grid
            item
            xs={11}
            className="simpler-font"
            style={{ fontSize: '0.6rem' }}
          >
            To log in using Facebook or Google, please open this site in a web
            browser such as Safari or Chrome.
          </Grid>
        )}
      </Grid>
      <Typography component="div" className={classes.marginTop}>
        <p className={classes.marginTop}>OR, log in with email:</p>
      </Typography>
      <Grid container justify="center">
        <Grid item xs={12} sm={10}>
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
      <Grid container justify="center">
        <Grid item xs={12} sm={10} className={classes.marginTop}>
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
        <Grid item xs={12} sm={10}>
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
            onClick={handleEmailLogin}
            startIcon={<Email />}
            disabled={!email || !password || submitting}
          >
            {!submitting ? 'Log in with email' : <CircularProgress size={28} />}
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
    </div>
  );
};
