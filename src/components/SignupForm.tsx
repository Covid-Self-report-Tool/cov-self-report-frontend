import React, { FC, useState, useEffect } from 'react';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { signUp, googleLogin } from 'utils/firebase';
import firebase from 'config/firebase';

const useStyles = makeStyles({
  padding: {
    padding: '20px',
  },
  marginTop: {
    marginTop: 20,
  },
});

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

window.recaptchaVerifier = window.recaptchaVerifier || {};

export const SignupForm: FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<boolean>(false);
  const [errorPasswordMessage2, setErrorPasswordMessage2] = useState<string>(
    ''
  );
  const [errorPassword2, setErrorPassword2] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string>('');

  const resetErrors = () => {
    setEmailError(false);
    setErrorPassword(false);
    setErrorPassword2(false);
    setEmailErrorMessage('');
    setErrorPasswordMessage('');
    setErrorPasswordMessage2('');
  };

  const handleSignupError = (code: string, message: string) => {
    switch (code) {
      case 'auth/email-already-in-use':
        setEmailError(true);
        setEmailErrorMessage('That email is already in use');
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

  useEffect(() => {
    try {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        'recaptcha',
        {
          callback: (response: any) => {
            setCaptchaToken(response);
          },
          'expired-callback': () => {
            window.recaptchaVerifier.clear();
            // Response expired. Needs to rerender captcha
          },
        }
      );
      window.recaptchaVerifier.render();
    } catch (err) {
      // TODO: failed to load captcha
    }
  }, []);

  const handleSignup = () => {
    resetErrors();
    if (password.length < 6) {
      setErrorPassword(true);
      setErrorPasswordMessage('Password must be at least 6 characters long');
    } else if (password2.length < 6) {
      setErrorPassword2(true);
      setErrorPasswordMessage2('Password must be at least 6 characters long');
    } else if (password !== password2) {
      setErrorPassword2(true);
      setErrorPasswordMessage2('Passwords do not match');
    } else {
      // TODO: verify captcha on backend
      signUp(email, password, captchaToken).catch(err => {
        handleSignupError(err.code, err.message);
      });
    }
  };

  const handleGoogleLogin = (event: React.MouseEvent) => {
    event.preventDefault();

    googleLogin().catch(err => {
      handleSignupError(err.code, err.message);
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handlePasswordChange2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword2(event.currentTarget.value);
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
              id="email"
              label="Email"
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
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              required
              error={errorPassword}
              helperText={errorPasswordMessage}
            />
          </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Fingerprint />
          </Grid>
          <Grid item md sm xs>
            <TextField
              id="password2"
              label="Confirm Password"
              type="password"
              value={password2}
              onChange={handlePasswordChange2}
              fullWidth
              required
              error={errorPassword2}
              helperText={errorPasswordMessage2}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '20px' }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none', marginRight: '20px' }}
            onClick={handleSignup}
            disabled={!Boolean(captchaToken)}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none', marginRight: '20px' }}
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
        </Grid>
        <div className={classes.marginTop} id="recaptcha"></div>
      </div>
    </Paper>
  );
};
