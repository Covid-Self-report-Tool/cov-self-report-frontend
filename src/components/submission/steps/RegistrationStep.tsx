import React, { FC } from 'react';
import { DialogTitle, DialogContent } from '@material-ui/core';
import { IfFirebaseUnAuthed, IfFirebaseAuthed } from '@react-firebase/auth';

import { SignupForm } from 'components/signup';

export const RegistrationStep: FC = () => {
  return (
    <>
      <DialogTitle>Submit</DialogTitle>
      <DialogContent dividers>
        <IfFirebaseAuthed>
          {({ user }) => <span>Logged in as {user.email}</span>}
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>{() => <SignupForm />}</IfFirebaseUnAuthed>
      </DialogContent>
    </>
  );
};
