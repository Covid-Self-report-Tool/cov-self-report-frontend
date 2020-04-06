import React from 'react';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';
import { Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import UserPopoverMenu from './UserPopoverMenu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    textDecoration: 'none',
    textAlign: 'center',
    flex: '1 1 100%',
  },
  appBar: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: 'transparent',
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
  },
  signupBtn: {
    marginLeft: theme.spacing(2),
  },
}));

const MainNavBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="absolute" className={useStyles().appBar}>
      <Toolbar>
        <Typography
          to="/"
          component={RouteLink}
          variant="h4"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Covid-19 True Data Tracker
          <Typography component="p" variant="subtitle1" noWrap>
            A tool that tracks self-reported and confirmed infections
          </Typography>
        </Typography>
        <div
          style={{
            flex: '1 50%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            to="/self-report"
            component={RouteLink}
          >
            Add Symptoms
          </Button>
          <IfFirebaseUnAuthed>
            {() => (
              <Button
                variant="outlined"
                color="inherit"
                className={classes.signupBtn}
                component={RouteLink}
                to="/login"
              >
                Login / Signup
              </Button>
            )}
          </IfFirebaseUnAuthed>
          <IfFirebaseAuthed>{() => <UserPopoverMenu />}</IfFirebaseAuthed>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavBar;
