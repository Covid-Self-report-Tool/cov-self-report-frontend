import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  Toolbar,
  useScrollTrigger,
  Slide,
} from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';

import firebase from 'config/firebase';
import { NavBarTypes, MuiClassList } from 'types/top-bar';
import { UserPopoverMenu } from 'components/top-bar';
import {
  TitleWrap,
  Burger,
  MySymptomsBtn,
  LoginSignupBtn,
} from 'components/top-bar';

const TopBarBtns: FC<MuiClassList> = ({ classes }) => (
  <>
    <MySymptomsBtn classes={classes} />
    <IfFirebaseUnAuthed>
      {() => <LoginSignupBtn classes={classes} />}
    </IfFirebaseUnAuthed>
    <IfFirebaseAuthed>{() => <UserPopoverMenu />}</IfFirebaseAuthed>
  </>
);

const useStyles = (isHome: boolean) => {
  const topBarStyles = makeStyles(theme => ({
    root: {
      backgroundColor: isHome ? 'transparent' : theme.palette.grey[800],
      // backgroundColor: 'hsla(0, 0%, 20%, 0.4)', // TODO: give er a go
      boxShadow: 'none',
      color: theme.palette.common.white,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: 6,
      paddingRight: 6,
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
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
      // So gross but there's just no room on super small screens 😔
      [theme.breakpoints.down(321)]: {
        fontSize: '1.2rem',
        maxWidth: 200,
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '2rem',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '2.5rem',
      },
    },
    titleAndBadge: {
      position: 'relative',
      display: 'flex',
      flexWrap: 'nowrap',
      flex: 1,
      [theme.breakpoints.up('md')]: {
        marginLeft: 105,
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: 150,
      },
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
      fontSize: '0.8rem',
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
    signupLoginMobile: {
      marginLeft: 4,
      borderRadius: '100%',
      background: theme.palette.primary.main,
      padding: 3,
      // Put login/signup btn into sidebar on mobile, too much 💩 up top
      [theme.breakpoints.up(500)]: {
        display: 'none',
      },
    },
    snugBtnMobile: {
      [theme.breakpoints.down(400)]: {
        lineHeight: 1,
        textAlign: 'center',
        minWidth: 'auto', // default is not very compatible w/topbar flex
        padding: 6,
      },
    },
    badge: {
      backgroundColor: 'hsla(36, 100%, 50%, 0.95)',
      borderRadius: 7,
      fontSize: '10px',
      left: -11,
      lineHeight: 1,
      padding: '1px 3px',
      position: 'absolute',
      top: -3,
      zIndex: 1,
    },
  }));

  return topBarStyles();
};

export const TopBar: FC<NavBarTypes> = ({
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
        <Toolbar disableGutters className={classes.toolbar}>
          <Burger
            classes={classes}
            toggleDrawerOpen={toggleDrawerOpen}
            drawerOpen={drawerOpen}
          />
          <Box className={classes.titleAndBadge}>
            <sup className={classes.badge}>BETA</sup>
            <TitleWrap classes={classes} />
          </Box>
          {!loading && <TopBarBtns classes={classes} />}
        </Toolbar>
      </AppBar>
    </Slide>
  );
};
