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

type MuiClassList = {
  classes: {
    [key: string]: string;
  };
};

type NavBarTypes = {
  isHome: boolean;
  drawerOpen: boolean;
  toggleDrawerOpen: (active: boolean) => void;
};

type BurgerTypes = Omit<NavBarTypes, 'isHome'> & MuiClassList;

const useStyles = (isHome: boolean) => {
  const ok = makeStyles(theme => ({
    root: {
      backgroundColor: isHome ? 'transparent' : theme.palette.grey[800],
      boxShadow: 'none',
      color: theme.palette.common.white,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: 6,
      paddingRight: 6,
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.up(600)]: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    toolbar: {
      justifyContent: 'space-between',
    },
    title: {
      color: 'inherit',
      justifyContent: 'center',
      marginRight: 'auto', // forces it to the beginning in flexbox
      paddingRight: 5,
      paddingTop: 3,
      position: 'relative',
      textAlign: 'left',
      textDecoration: 'none',
      textShadow: '1px 1px 3px hsla(180, 2%, 10%, 0.75)',
      fontSize: '1.5rem',
      lineHeight: 1,
      [theme.breakpoints.up('md')]: {
        fontSize: '2.5rem',
      },
    },
    titleAndBadge: {
      position: 'relative',
      display: 'flex',
      flexWrap: 'nowrap',
      flex: 1,
    },
    // Hamburger
    burger: {
      color: 'inherit',
      padding: 0, // let the app bar do the padding
      marginLeft: 0, // default is -12px wtf
      marginRight: 4, // space between the title
      [theme.breakpoints.up(600)]: {
        marginRight: 8, // nitpicky: more room for landscape phones and up
      },
      // Hide on larger than wide tablet portrait
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    subTitle: {
      // lineHeight: 1,
      fontSize: '0.75rem',
      [theme.breakpoints.down(600)]: {
        fontSize: '0.5rem',
      },
    },
    appBarBtns: {
      color: 'inherit',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
      },
    },
    signupLoginBtn: {
      marginLeft: theme.spacing(1),
      // Put login/signup btn into sidebar on mobile, too much 💩 up top
      [theme.breakpoints.down(500)]: {
        display: 'none',
      },
    },
    snugBtnMobile: {
      [theme.breakpoints.down(400)]: {
        lineHeight: 1,
        minWidth: 'auto', // default is not very compatible w/topbar flex
        padding: 6,
      },
    },
    badge: {
      backgroundColor: 'hsla(36, 100%, 50%, 0.95)',
      borderRadius: 7,
      fontSize: '10px',
      left: -9,
      lineHeight: 1,
      padding: '1px 3px',
      position: 'absolute',
      top: -5,
      zIndex: 1,
    },
  }));

  return ok();
};

const MainNavBarBtns: FC<MuiClassList> = ({ classes }) => (
  <>
    <MySymptomsBtn classes={classes} />
    <IfFirebaseUnAuthed>
      {() => <LoginSignupBtn classes={classes} />}
    </IfFirebaseUnAuthed>
    <IfFirebaseAuthed>{() => <UserPopoverMenu />}</IfFirebaseAuthed>
  </>
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
  <Typography
    to="/"
    component={RouteLink}
    className={`${classes.title} MuiTypography-noWrap`}
  >
    <span className="MuiTypography-noWrap" style={{ lineHeight: 1 }}>
      Covid-19 Self-reporting Tool
    </span>
    <Typography
      component="p"
      variant="subtitle2"
      noWrap
      className={classes.subTitle}
    >
      An open data tool that tracks self-reported and confirmed infections
    </Typography>
  </Typography>
);

const Burger: FC<BurgerTypes> = ({
  toggleDrawerOpen,
  drawerOpen,
  classes = {},
}) => (
  <IconButton
    edge="start"
    className={classes.burger}
    aria-label="menu"
    onClick={() => toggleDrawerOpen(!drawerOpen)}
  >
    <MenuIcon />
  </IconButton>
);

const MySymptomsBtn: FC<MuiClassList> = ({ classes }) => (
  <Button
    variant="contained"
    color="secondary"
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
            classes={classes}
            toggleDrawerOpen={toggleDrawerOpen}
            drawerOpen={drawerOpen}
          />
          <Box className={classes.titleAndBadge}>
            <sup className={classes.badge}>BETA</sup>
            <TitleWrap classes={classes} />
          </Box>
          {!loading && <MainNavBarBtns classes={classes} />}
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
