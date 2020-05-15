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
    marginRight: 'auto',
    marginLeft: 4,
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
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
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
          onClick={() => history.goBack()}
          color="primary"
          variant="outlined"
          size="small"
        >
          Back
        </Button>
        <Button
          onClick={() => history.push('/')}
          color="primary"
          variant="outlined"
          size="small"
        >
          Exit to map
        </Button>
      </DialogActions>
    </Dialog>
  );
};
