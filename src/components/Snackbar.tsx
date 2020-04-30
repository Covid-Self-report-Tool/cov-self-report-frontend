import React, { FC, useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { GlobalContext } from 'components';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// TODO: restore for login/logout success/fail
export const CustomSnackbar: FC = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { open, message = '', severity, duration } = state.uiAlert;

  const handleCloseInternal = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    if (state.uiAlert.open) {
      dispatch({
        type: 'TOGGLE_UI_ALERT',
        payload: {
          open: false,
          message: '',
        },
      });
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration || 4500}
      onClose={handleCloseInternal}
      key={message}
    >
      <Alert onClose={handleCloseInternal} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};
