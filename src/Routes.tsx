import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NavBar } from 'components';
import { Home, Login } from 'views';
import { AuthProvider } from 'Auth';

const Routes: FC = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/models"></Route>
          <Route path="/about"></Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default Routes;
