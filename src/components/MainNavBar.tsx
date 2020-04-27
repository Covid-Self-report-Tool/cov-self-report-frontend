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

type MuiClassList = {
  classes: {
    [key: string]: string;
  };
};

const useStyles = (isHome: boolean) => {
  const ok = makeStyles(theme => ({
    root: {
      backgroundColor: isHome ? 'transparent' : theme.palette.grey[800],
      boxShadow: 'none',
      color: theme.palette.common.white,
      padding: theme.spacing(1),
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2),
      },
    },
    titleWrap: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'block',
        textAlign: 'center',
        flex: '1 1 100%',
      },
    },
    toolbar: {
      justifyContent: 'space-between',
    },
    title: {
      position: 'relative',
      textDecoration: 'none',
      textAlign: 'left',
      paddingTop: 3,
      paddingRight: 5,
      color: 'inherit',
      justifyContent: 'center',
      textShadow: '1px 1px 3px hsla(180, 2%, 10%, 0.75)',
      [theme.breakpoints.up('md')]: {
        flex: 0,
        display: 'inline-block',
      },
    },
    appBarBtns: {
      color: 'inherit',
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
      },
    },
    signupLoginBtn: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    // Hamburger
    menuButton: {
      color: 'inherit',
      padding: 6,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    subTitle: {
      lineHeight: 1,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    rightSideWrap: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        flex: '1 50%',
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
    snugBtnMobile: {
      [theme.breakpoints.down('xs')]: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 0,
        paddingRight: 0,
        lineHeight: 1,
      },
    },
    badge: {
      backgroundColor: 'hsla(36, 100%, 50%, 0.95)',
      borderRadius: 7,
      fontSize: '10px',
      lineHeight: '12px',
      padding: '1px 5px',
      position: 'absolute',
      right: 0,
      textShadow: 'none',
      top: 0,
    },
  }));

  return ok();
};

const MainNavBarBtns: FC<MuiClassList> = ({ classes }) => (
  <Box className={classes.rightSideWrap}>
    <MySymptomsBtn classes={classes} />
    <IfFirebaseUnAuthed>
      {() => <LoginSignupBtn classes={classes} />}
    </IfFirebaseUnAuthed>
    <IfFirebaseAuthed>{() => <UserPopoverMenu />}</IfFirebaseAuthed>
  </Box>
);

const LoginSignupBtn: FC<MuiClassList> = ({ classes }) => (
  <Button
    variant="contained"
    color="primary"
    className={`${classes.appBarBtns} ${classes.signupLoginBtn} ${classes.snugBtnMobile}`}
    component={RouteLink}
    to="/login"
  >
    Login / Signup
  </Button>
);

const TitleWrap: FC<MuiClassList> = ({ classes }) => (
  <Box className={`${classes.titleWrap} MuiTypography-noWrap`}>
    <Typography
      to="/"
      component={RouteLink}
      variant="h5"
      // noWrap
      className={`${classes.title} MuiTypography-noWrap`}
    >
      <span className="MuiTypography-noWrap" style={{ lineHeight: 1 }}>
        Covid-19 Self-reporting Tool
      </span>
      <Box className={classes.badge}>BETA</Box>
      <Typography
        component="p"
        variant="subtitle2"
        noWrap
        className={classes.subTitle}
      >
        An open data tool that tracks self-reported and confirmed infections
      </Typography>
    </Typography>
  </Box>
);

const Burger: FC<NavBarTypes> = ({ isHome, toggleDrawerOpen, drawerOpen }) => {
  const classes = useStyles(isHome);

  return (
    <IconButton
      edge="start"
      className={classes.menuButton}
      aria-label="menu"
      onClick={() => toggleDrawerOpen(!drawerOpen)}
    >
      <MenuIcon />
    </IconButton>
  );
};

const MySymptomsBtn: FC<MuiClassList> = ({ classes }) => (
  <Button
    variant="contained"
    color="secondary"
    size="small"
    to="/self-report"
    className={`${classes.appBarBtns} ${classes.snugBtnMobile}`}
    component={RouteLink}
  >
    My Case
  </Button>
);

export const MainNavBar: FC<NavBarTypes> = ({
  isHome,
  toggleDrawerOpen,
  drawerOpen,
}) => {
  const classes = useStyles(isHome);
  const trigger = useScrollTrigger();
  const [, loading] = useAuthState(firebase.auth());

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar disableGutters className={classes.toolbar} variant="dense">
          <Burger
            isHome={isHome}
            toggleDrawerOpen={toggleDrawerOpen}
            drawerOpen={drawerOpen}
          />
          <TitleWrap classes={classes} />
          {!loading && <MainNavBarBtns classes={classes} />}
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
