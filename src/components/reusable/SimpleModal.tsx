import React, { FC, useState, useReducer } from 'react';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core';

type SimpleModalTypes = {
  children: React.ReactNode;
  title: string;
};

export const SimpleModal: FC<SimpleModalTypes> = ({ children, title }) => {
  const history = useHistory();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    history.goBack();
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="form-dialog-title"
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => history.goBack()} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
