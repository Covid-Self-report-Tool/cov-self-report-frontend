import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import {
  Dashboard,
  LoginForm,
  GlobalProvider,
  // TODO: restore for login/logout success/fail
  // CustomSnackbar,
  // CustomSnackbarBasics,
  SimpleModal,
  SuccessConfModal,
} from 'components';
import { UserProvider } from 'context';
import { Modal } from 'components/submission';
import { Home, Signup, About, Models, Logout, List } from 'views';
import firebase from 'config/firebase';
import { VerifyEmail } from 'views/VerifyEmail';
import { theme, GlobalCss } from 'theme';

const Routes: FC = () => {
  // TODO: make messages and severity flexible.
  // TODO: use reducer instead of shit-ton of useStates.
  // const [snackbarConfig, setSnackbarConfig] = useState<CustomSnackbarBasics>({
  //   message: 'Success! Thank you for submitting.',
  //   severity: 'success',
  // });
  // const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
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
                <Route path="/list">
                  <List />
                </Route>
                <Route path="/" exact>
                  <Home />
                </Route>
                <SuccessConfModal
                  open={successConfOpen}
                  setOpen={setSuccessConfOpen}
                />
              </Dashboard>
              {/* None of the modals need to be inside Dashboard */}
              <Route path="/login">
                {!user && !loading ? (
                  <SimpleModal title="Login">
                    <LoginForm />
                  </SimpleModal>
                ) : (
                  <Redirect to="/"></Redirect>
                )}
              </Route>
              <Route path="/logout">
                <SimpleModal title="Logout">
                  <Logout />
                </SimpleModal>
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
                <SimpleModal title="Sign up">
                  <Signup />
                </SimpleModal>
              </Route>
            </Router>
          </ThemeProvider>
        </UserProvider>
      </GlobalProvider>
    </FirebaseAuthProvider>
  );
};

export default Routes;
