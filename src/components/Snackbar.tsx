import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export interface CustomSnackbarBasics {
  severity: Color;
  message: string;
}

export interface CustomSnackbarTypes {
  snackbarConfig: CustomSnackbarBasics;
  snackbarOpen: boolean;
  setSnackbarOpen: React.Dispatch<boolean>;
}

export function CustomSnackbar(props: CustomSnackbarTypes) {
  const { snackbarConfig, setSnackbarOpen, snackbarOpen } = props;
  const { severity, message } = snackbarConfig;

  const handleCloseInternal = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={4500}
      onClose={handleCloseInternal}
    >
      <Alert onClose={handleCloseInternal} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
