import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home, Login, About, Models } from 'views';
import { Dashboard } from 'components';

const Routes: FC = () => {
  return (
    <Router>
      <Dashboard>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/models">
            <Models />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Dashboard>
    </Router>
  );
};

export default Routes;
