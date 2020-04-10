import React, { FC, useState } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  Fade,
  CircularProgress,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import firebase from 'firebase/app';

const useStyles = makeStyles({
  root: {
    padding: '20px',
  },
  marginTop: {
    marginTop: '15px',
  },
});

type VerifyEmailType = {
  afterVerification?: () => void;
};

export const VerifyEmailForm: FC<VerifyEmailType> = ({ afterVerification }) => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [sent, setSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFirebaseError = (code: string, message: string) => {
    switch (code) {
      case 'auth/invalid-email':
        setEmailError(true);
        setEmailErrorMessage('Invalid email');
        break;
      case 'auth/user-not-found':
        setEmailError(true);
        setEmailErrorMessage('User does not exist');
        break;
      default:
        alert(message);
        break;
    }
  };

  const resetErrors = () => {
    setEmailError(false);
    setEmailErrorMessage('');
  };

  const handleVerifyEmail = async (event: React.MouseEvent) => {
    event.preventDefault();

    resetErrors();

    setLoading(true);
    setEmail('');
    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        if (afterVerification) {
          afterVerification();
        }
        setSent(true);
        setTimeout(() => {
          setSent(false);
        }, 5000);
      })
      .catch(err => {
        handleFirebaseError(err.code, err.message);
      });
    setLoading(false);
  };

  return (
    <Paper className={classes.root}>
      <div>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item md sm xs={12}>
            <TextField
              id="email"
              label="Enter your email"
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
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.marginTop}
        >
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none', marginRight: '20px' }}
              onClick={handleVerifyEmail}
              disabled={loading}
            >
              Verify Email
            </Button>
          </Grid>
          {loading && (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          )}
        </Grid>
        <Grid container>
          <Grid item md sm xs={12}>
            <Fade in={sent}>
              <Alert severity="success" className={classes.marginTop}>
                <AlertTitle>Verification Email Sent</AlertTitle>
                You should receive an email in a few minutes to reset your
                password
              </Alert>
            </Fade>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};
