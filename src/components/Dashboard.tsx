import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';

import { SiteNavBtns, BackToTopBtn, MobileOffCanvasNav } from 'components';
import { TopBar } from 'components/top-bar';
import { useStyles } from './dashboard.styles';
import { isValidUserAgent } from '../utils';

type DashboardTypes = {
  children: React.ReactNode | null | undefined;
};

// CRED: https://material-ui.com/getting-started/templates/dashboard/
export const Dashboard: FC<DashboardTypes> = ({ children }) => {
  const classes = useStyles();
  const isHome = useLocation().pathname === '/';
  const [drawerOpen, toggleDrawerOpen] = useState<boolean>(false);

  if (isValidUserAgent()) {
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
          <>
            <Container component="main" className={classes.content}>
              {children}
              <BackToTopBtn />
            </Container>
          </>
        )}
        <MobileOffCanvasNav
          drawerOpen={drawerOpen}
          toggleDrawerOpen={toggleDrawerOpen}
        >
          <SiteNavBtns />
        </MobileOffCanvasNav>
      </div>
    );
  }
  return (
    <div className={classes.browserMessage}>
      <Typography align="center" gutterBottom variant="h4">
        COVID Self-Reporting Tool
      </Typography>
      <Typography align="center" gutterBottom variant="body1">
        Please open the COVID Self-Reporting Tool in one of our supported
        browsers.
      </Typography>
      <Typography align="center" gutterBottom variant="body2">
        Supported Browsers: Google Chrome, Safari, Mozilla Firefox, Internet
        Explorer
      </Typography>
    </div>
  );
};
