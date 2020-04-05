import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

type MainNavBarProps = {
  classes: {
    appBar: string;
    appBarShift: string;
    toolbar: string;
    menuButton: string;
    menuButtonHidden: string;
    title: string;
  };
  handleDrawerOpen: () => void;
  open: boolean | undefined;
};

// TODO: invalidate map size on sidebar toggle click
const MainNavBar: FC<MainNavBarProps> = ({
  classes,
  handleDrawerOpen,
  open,
}) => (
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
        component={Link}
        variant="h6"
        color="inherit"
        noWrap
        className={classes.title}
      >
        Covid-19 True Data Tracker
      </Typography>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default MainNavBar;
