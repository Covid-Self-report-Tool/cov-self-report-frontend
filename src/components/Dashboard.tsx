import React, { FC } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useStyles } from './dashboard-styles';
import MainNavBar from './MainNavBar';
import Sidebar from './Sidebar';

type DashboardTypes = {
  children: React.ReactNode | null | undefined;
};

// CRED: https://material-ui.com/getting-started/templates/dashboard/
export const Dashboard: FC<DashboardTypes> = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainNavBar
        open={open}
        classes={classes}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Sidebar
        open={open}
        classes={classes}
        handleDrawerClose={handleDrawerClose}
      />
      {/* <div className={classes.appBarSpacer} /> */}
      <main className={classes.content}>{children}</main>
    </div>
  );
};
