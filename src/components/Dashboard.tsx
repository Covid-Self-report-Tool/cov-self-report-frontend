import React, { FC } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Container, withStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

import { useStyles } from './dashboard.styles';
import { MainNavBar, ListItems, BackToTopBtn } from 'components';

let theme = createMuiTheme({
  overrides: {
    MuiInput: {
      // Bebas is bad news for <input> since it lacks lowercase. Will also apply
      // Roboto to textful pages like <About>.
      root: { fontFamily: "'Roboto', sans-serif" },
    },
  },
  palette: {
    type: 'dark',
    primary: grey,
  },
  typography: {
    fontFamily: [
      'Bebas Neue',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 18,
  },
});
theme = responsiveFontSizes(theme);

type DashboardTypes = {
  children: React.ReactNode | null | undefined;
};

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    '.simpler-font': {
      fontFamily: "'Roboto', sans-serif",
    },
  },
})(() => null);

// CRED: https://material-ui.com/getting-started/templates/dashboard/
export const Dashboard: FC<DashboardTypes> = ({ children }) => {
  const classes = useStyles();
  const isHome = useLocation().pathname === '/';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalCss />
      <MainNavBar isHome={isHome} />
      <Switch>
        <Route path="/" exact>
          {children}
        </Route>
        <Route>
          <>
            <div id="back-to-top-anchor" />
            <Container component="main" className={classes.content}>
              {children}
              <BackToTopBtn />
            </Container>
          </>
        </Route>
      </Switch>
      <ListItems />
    </ThemeProvider>
  );
};
