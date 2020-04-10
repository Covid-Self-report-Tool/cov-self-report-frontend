import React from 'react';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';
import { Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  useScrollTrigger,
  Slide,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { UserPopoverMenu } from 'components';

interface NavBarTypes {
  isHome: boolean;
  drawerOpen: boolean;
  toggleDrawerOpen: (active: boolean) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
  },
  title: {
    textDecoration: 'none',
    textAlign: 'center',
    flex: '1 1 100%',
    color: theme.palette.common.white,
  },
  signupBtn: {
    marginLeft: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'inherit',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

export const MainNavBar = (props: NavBarTypes) => {
  const { isHome, toggleDrawerOpen, drawerOpen } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="fixed"
        color={isHome ? 'transparent' : 'primary'}
        className={classes.root}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => toggleDrawerOpen(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            to="/"
            component={RouteLink}
            variant="h4"
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
                  color="primary"
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
    </Slide>
  );
};
