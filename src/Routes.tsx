import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';

import { Dashboard } from 'components';
import { Modal } from 'components/submission';
import { Home, Login, Signup, About, Models, Logout } from 'views';
import { firebaseConfig } from 'config';
import { VerifyEmail } from 'views/VerifyEmail';

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
            <Route path="/logout">
              <Logout />
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
            <Route path="/verify_email">
              <VerifyEmail />
            </Route>
            <Route>
              <Home />
            </Route>
          </Switch>
          <Route path="/self-report">
            <Modal />
          </Route>
        </Dashboard>
      </Router>
    </FirebaseAuthProvider>
  );
};

export default Routes;
