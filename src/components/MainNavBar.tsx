import React, { FC } from 'react';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';
import { Link as RouteLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import UserPopoverMenu from './UserPopoverMenu';

const useStyles = makeStyles(theme => {
  // TODO: pass this down instead of hard-code, although may be less relevant
  // with new sidebar/layout.
  const drawerWidth = 240;

  return {
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      textDecoration: 'none',
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
    toolbarBtn: {
      marginRight: theme.spacing(2),
    },
  };
});

type MainNavBarProps = {
  handleDrawerOpen: () => void;
  open: boolean | undefined;
};

// TODO: invalidate map size on sidebar toggle click
const MainNavBar: FC<MainNavBarProps> = ({ handleDrawerOpen, open }) => {
  const classes = useStyles();

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          to="/"
          component={RouteLink}
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Covid-19 True Data Tracker
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.toolbarBtn}
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
              className={classes.toolbarBtn}
              component={RouteLink}
              to="/login"
            >
              Login / Signup
            </Button>
          )}
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthed>{() => <UserPopoverMenu />}</IfFirebaseAuthed>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavBar;
