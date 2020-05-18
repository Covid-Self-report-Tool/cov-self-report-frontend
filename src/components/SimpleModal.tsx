import React, { FC, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@material-ui/core';

type SimpleModalTypes = {
  children: React.ReactNode;
  title: string;
  fullScreen?: boolean;
  leftSideElems?: () => React.ReactNode; // e.g. "Don't have an account?"
  onClose?: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  leftSideActionsLink: {
    color: theme.palette.info.main,
    textDecoration: 'none',
  },
  actionBtn: {
    minWidth: 40,
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const SimpleModal: FC<SimpleModalTypes> = ({
  children,
  title,
  leftSideElems,
  fullScreen = true,
  onClose,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);

    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      aria-labelledby="form-dialog-title"
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        {children}
      </DialogContent>
      <DialogActions>
        {leftSideElems ? leftSideElems() : null}
        <Button
          className={classes.actionBtn}
          onClick={() => handleClose()}
          color="primary"
          size="small"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
