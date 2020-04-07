import React, { FC } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { useStyles } from './dashboard.styles';
import { MainNavBar, ListItems } from 'components';

type DashboardTypes = {
  children: React.ReactNode | null | undefined;
};

// CRED: https://material-ui.com/getting-started/templates/dashboard/
export const Dashboard: FC<DashboardTypes> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainNavBar />
      <main className={classes.content}>
        {children}
        <ListItems />
      </main>
    </div>
  );
};
