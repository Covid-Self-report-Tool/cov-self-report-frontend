import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavBar } from 'components';

import { Home } from 'views';

const Routes: FC = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/models"></Route>
        <Route path="/about"></Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
