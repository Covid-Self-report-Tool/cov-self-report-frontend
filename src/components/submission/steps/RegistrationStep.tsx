import React, { FC, useEffect, useContext } from 'react';
import { DialogTitle, DialogContent } from '@material-ui/core';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';

import firebase from 'config/firebase';
import { GlobalContext } from 'components';
import { SignupForm } from 'components/signup';

export const RegistrationStep: FC = () => {
  const { dispatch } = useContext(GlobalContext);
  const [user] = useAuthState(firebase.auth());

  useEffect(() => {
    // TODO: confirm that `loading` is not needed from `useAuthState`
    if (!user) {
      dispatch({
        type: 'TOGGLE_LOGIN_SIGNUP_MODAL',
        payload: 'signup',
      });
    }
  }, [user, dispatch]);

  return (
    <>
      <DialogTitle>Submit</DialogTitle>
      <DialogContent dividers>
        <IfFirebaseAuthed>
          {({ user }) => (
            <p style={{ textAlign: 'center' }}>Logged in as {user.email}</p>
          )}
        </IfFirebaseAuthed>
        {/* Fallback in case the user cancels the signup/login modal */}
        <IfFirebaseUnAuthed>{() => <SignupForm />}</IfFirebaseUnAuthed>
      </DialogContent>
    </>
  );
};
