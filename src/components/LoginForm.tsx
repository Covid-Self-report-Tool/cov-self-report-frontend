import React, { FC } from 'react';
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

const useStyles = makeStyles({
  margin: {},
  padding: {
    padding: '20px',
  },
});

export const LoginForm: FC = () => {
  const classes = useStyles();
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
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none', marginRight: '20px' }}
          >
            Sign Up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none', marginRight: '20px' }}
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
