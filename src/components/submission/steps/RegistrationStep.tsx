import React, { FC } from 'react';
import { DialogTitle, DialogContent } from '@material-ui/core';
import 'firebase/auth';
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';

import { SignupForm } from 'components/signup';

export const RegistrationStep: FC = () => {
  return (
    <>
      <DialogTitle>Submit</DialogTitle>
      <DialogContent dividers>
        <IfFirebaseAuthed>
          {({ user }) => (
            <div className="simpler-font" style={{ textAlign: 'center' }}>
              <h4 style={{ fontWeight: 'normal' }}>
                Almost there! Click the <b>SUBMIT</b> button below to upload
                your case.
              </h4>
              <p
                style={{ fontSize: '0.75rem', marginLeft: 20, marginRight: 20 }}
              >
                You are logged in as {user.email} and are ready to submit your
                case. Just click <b>SUBMIT</b> and you are all set.
              </p>
            </div>
          )}
        </IfFirebaseAuthed>
        <IfFirebaseUnAuthed>{() => <SignupForm />}</IfFirebaseUnAuthed>
      </DialogContent>
    </>
  );
};
