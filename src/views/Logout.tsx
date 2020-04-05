import React, { FC } from 'react';
import { IfFirebaseAuthed } from '@react-firebase/auth';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { logOut } from 'utils';

export const Logout: FC = () => {
  const history = useHistory();

  // @ts-ignore
  return (
    <IfFirebaseAuthed>
      {() => <Button onClick={() => logOut(history)}>Log Out</Button>}
    </IfFirebaseAuthed>
  );
};
