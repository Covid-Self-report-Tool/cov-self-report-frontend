import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';

import { Dashboard } from 'components';
import { Home, Login, Signup, About, Models } from 'views';
import { firebaseConfig } from 'config';

const Routes: FC = () => {
  return (
    // @ts-ignore
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
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
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Dashboard>
      </Router>
    </FirebaseAuthProvider>
  );
};

export default Routes;
