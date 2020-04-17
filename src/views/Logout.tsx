import React, { FC, useContext } from 'react';
import { IfFirebaseAuthed } from '@react-firebase/auth';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { logOut } from 'utils/firebase';
import { UserContext } from 'context';

export const Logout: FC = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  // @ts-ignore
  return (
    <IfFirebaseAuthed>
      {() => <Button onClick={() => logOut(history, dispatch)}>Log Out</Button>}
    </IfFirebaseAuthed>
  );
};
