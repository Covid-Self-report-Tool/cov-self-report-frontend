import React, { FC, useState } from 'react';
import { Link as RouteLink, useHistory } from 'react-router-dom';
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
  // e.g. "Don't have an account?"
  leftSideLink?: {
    text: string;
    to: string;
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  leftSideActionsLink: {
    color: theme.palette.info.main,
    textDecoration: 'none',
  },
  actionBtn: {
    minWidth: 40,
  },
}));

export const SimpleModal: FC<SimpleModalTypes> = ({
  children,
  title,
  leftSideLink,
}) => {
  const history = useHistory();
  const classes = useStyles();
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
      fullWidth
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        {leftSideLink ? (
          <RouteLink
            to={leftSideLink.to}
            className={classes.leftSideActionsLink}
          >
            {leftSideLink.text}
          </RouteLink>
        ) : null}
        <Button
          className={classes.actionBtn}
          onClick={() => history.goBack()}
          color="primary"
          size="small"
        >
          Back
        </Button>
        <Button
          className={classes.actionBtn}
          onClick={() => history.push('/')}
          color="primary"
          size="small"
        >
          Exit to map
        </Button>
      </DialogActions>
    </Dialog>
  );
};
