import React, { FC, useCallback, useState } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

const useStyles = makeStyles({
  margin: {},
  padding: {
    padding: '20px',
  },
});

export const LoginForm: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = useCallback(
    async event => {
      event.preventDefault();

      try {
        await firebase
          .app()
          .auth()
          .signInWithEmailAndPassword(email, password);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history, email, password]
  );

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Paper className={classes.padding}>
      <div className={classes.margin}>
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
            <Button
              disableFocusRipple
              disableRipple
              style={{ textTransform: 'none' }}
              variant="text"
              color="primary"
            >
              Forgot password ?
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center" style={{ marginTop: '10px' }}>
          <Link to="/signup">
            <Button
              variant="outlined"
              color="primary"
              style={{ textTransform: 'none', marginRight: '20px' }}
            >
              Sign Up
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none', marginRight: '20px' }}
            onClick={e => handleSignIn(e)}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none' }}
          >
            Login with Google
          </Button>
        </Grid>
      </div>
    </Paper>
  );
};
