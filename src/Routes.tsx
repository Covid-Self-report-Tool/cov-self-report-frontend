import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';

import { theme, GlobalCss } from './theme';
import {
  Dashboard,
  LoginForm,
  StoreProvider,
  CustomSnackbar,
  CustomSnackbarBasics,
  SimpleModal,
} from 'components';
import { FormProvider } from 'context';
import { Modal } from 'components/submission';
import { Home, Signup, About, Models, Logout, List } from 'views';
import { firebaseConfig } from 'config';
import { VerifyEmail } from 'views/VerifyEmail';

const Routes: FC = () => {
  // TODO: make messages and severity flexible.
  // TODO: use reducer instead of shit-ton of useStates.
  const [snackbarConfig, setSnackbarConfig] = useState<CustomSnackbarBasics>({
    message: 'Success! Thank you for submitting.',
    severity: 'success',
  });
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  return (
    // @ts-ignore
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <StoreProvider>
        <FormProvider>
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
                <CustomSnackbar
                  snackbarConfig={snackbarConfig}
                  snackbarOpen={snackbarOpen}
                  setSnackbarOpen={setSnackbarOpen}
                />
              </Dashboard>
              {/* None of the modals need to be inside Dashboard */}
              <Route path="/login">
                <SimpleModal title="Login">
                  <LoginForm />
                </SimpleModal>
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
                <Modal setSnackbarOpen={setSnackbarOpen} />
              </Route>
              <Route path="/signup">
                <SimpleModal title="Sign up">
                  <Signup />
                </SimpleModal>
              </Route>
            </Router>
          </ThemeProvider>
        </FormProvider>
      </StoreProvider>
    </FirebaseAuthProvider>
  );
};

export default Routes;
