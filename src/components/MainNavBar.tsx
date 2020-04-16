import React, { FC } from 'react';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';
import { Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  useScrollTrigger,
  Slide,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuthState } from 'react-firebase-hooks/auth';

import { UserPopoverMenu } from 'components';
import firebase from 'config/firebase';

interface NavBarTypes {
  isHome: boolean;
  drawerOpen: boolean;
  toggleDrawerOpen: (active: boolean) => void;
}

const useStyles = (isHome: boolean) => {
  const ok = makeStyles(theme => ({
    root: {
      padding: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2),
      },
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.common.white,
      boxShadow: 'none',
      backgroundColor: isHome ? 'transparent' : theme.palette.grey[800],
    },
    titleWrap: {
      [theme.breakpoints.up('md')]: {
        textAlign: 'center',
        flex: '1 1 100%',
      },
    },
    title: {
      textDecoration: 'none',
      textAlign: 'left',
      color: 'inherit',
      justifyContent: 'center',
      textShadow: '1px 1px 3px hsla(180, 2%, 10%, 0.75)',
      [theme.breakpoints.up('md')]: {
        flex: 0,
        display: 'inline-block',
      },
    },
    signupBtn: {
      color: 'inherit',
      marginLeft: theme.spacing(1),
    },
    menuButton: {
      color: 'inherit',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    subTitle: {
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
      },
    },
    rightSideWrap: {
      flex: 1,
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        flex: '1 50%',
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
  }));

  return ok();
};

export const MainNavBar: FC<NavBarTypes> = ({
  isHome,
  toggleDrawerOpen,
  drawerOpen,
}) => {
  const classes = useStyles(isHome);
  const trigger = useScrollTrigger();

  const [user, loading] = useAuthState(firebase.auth());

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar disableGutters>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => toggleDrawerOpen(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Box className={classes.titleWrap}>
            <Typography
              to="/"
              component={RouteLink}
              variant="h4"
              noWrap
              className={classes.title}
            >
              Covid-19 True Data Tracker
              <Typography
                component="p"
                variant="subtitle2"
                noWrap
                className={classes.subTitle}
              >
                A tool that tracks self-reported and confirmed infections
              </Typography>
            </Typography>
          </Box>
          <Box className={classes.rightSideWrap}>
            {!loading && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  to="/self-report"
                  component={RouteLink}
                >
                  {user ? 'Edit Symptoms' : 'Add Symptoms'}
                </Button>
                <IfFirebaseUnAuthed>
                  {() => (
                    <Button
                      variant="contained"
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
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
