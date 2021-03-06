import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';

import { SiteNavBtns, BackToTopBtn, MobileOffCanvasNav } from 'components';
import { TopBar } from 'components/top-bar';
import { useStyles } from './dashboard.styles';

type DashboardTypes = {
  children: React.ReactNode | null | undefined;
};

// CRED: https://material-ui.com/getting-started/templates/dashboard/
export const Dashboard: FC<DashboardTypes> = ({ children }) => {
  const classes = useStyles();
  const isHome = useLocation().pathname === '/';
  const [drawerOpen, toggleDrawerOpen] = useState<boolean>(false);

  return (
    <div className={classes.root}>
      <TopBar
        isHome={isHome}
        drawerOpen={drawerOpen}
        toggleDrawerOpen={toggleDrawerOpen}
      />
      <div id="back-to-top-anchor" />
      {isHome ? (
        children
      ) : (
        <Container component="main" className={classes.content}>
          {children}
          <BackToTopBtn />
        </Container>
      )}
      <MobileOffCanvasNav
        drawerOpen={drawerOpen}
        toggleDrawerOpen={toggleDrawerOpen}
      >
        <SiteNavBtns />
      </MobileOffCanvasNav>
    </div>
  );
};
