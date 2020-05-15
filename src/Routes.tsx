import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import {
  Dashboard,
  GlobalProvider,
  SimpleModal,
  CustomSnackbar,
  SuccessConfModal,
} from 'components';
import { UserProvider } from 'context';
import { Modal } from 'components/submission';
import {
  Home,
  About,
  Models,
  List,
  TermsOfService,
  PrivacyPolicy,
  SecretSnackground,
  Login,
  Signup,
} from 'views';
import firebase from 'config/firebase';
import { VerifyEmail } from 'views/VerifyEmail';
import { theme, GlobalCss } from 'theme';

const Routes: FC = () => {
  const [user, loading] = useAuthState(firebase.auth());
  const [successConfOpen, setSuccessConfOpen] = useState<boolean>(false);

  return (
    // @ts-ignore
    <FirebaseAuthProvider firebase={firebase}>
      <GlobalProvider>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalCss />
            <Router>
              <Dashboard>
                <Route path="/models">
                  <Models />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/privacy-policy">
                  <PrivacyPolicy />
                </Route>
                <Route path="/terms-of-service">
                  <TermsOfService />
                </Route>
                <Route path="/list">
                  <List />
                </Route>
                <Route path="/secret-snackground">
                  <SecretSnackground />
                </Route>
                <Route path="/" exact>
                  <Home />
                </Route>
                <SuccessConfModal
                  open={successConfOpen}
                  setOpen={setSuccessConfOpen}
                />
                <CustomSnackbar />
              </Dashboard>
              {/* None of the modals need to be inside Dashboard */}
              <Route path="/login">
                {!user && !loading ? <Login /> : <Redirect to="/"></Redirect>}
              </Route>
              <Route path="/verify_email">
                <SimpleModal title="Forgot password">
                  <VerifyEmail />
                </SimpleModal>
              </Route>
              <Route path="/self-report">
                <Modal setSuccessConfOpen={setSuccessConfOpen} />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
            </Router>
          </ThemeProvider>
        </UserProvider>
      </GlobalProvider>
    </FirebaseAuthProvider>
  );
};

export default Routes;
