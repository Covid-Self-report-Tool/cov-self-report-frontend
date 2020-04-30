import React, { FC, useContext } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Link,
  IconButton,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { GlobalContext } from 'context';

// Styles for main parent component
const useStyles = makeStyles(theme => ({
  dialogTitle: {
    margin: 0,
    padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogContent: {
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  },
  symptomsBtn: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1),
  },
}));

interface DialogTitleProps {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  classes: {
    [key: string]: string;
  };
}

const Title: FC<DialogTitleProps> = props => {
  const { children, classes, onClose, ...other } = props;

  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export const SplashScreen: FC = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(GlobalContext);

  const handleClickOpen = () => {
    dispatch({ type: 'SHOW_SPLASH', payload: true });
  };

  const handleClose = () => {
    dispatch({ type: 'SHOW_SPLASH', payload: false });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={state.showSplash}
      >
        <Title
          id="customized-dialog-title"
          onClose={handleClose}
          classes={classes}
        >
          COVID-19 Self-reporting Tool
        </Title>
        <DialogContent dividers className={classes.dialogContent}>
          <Typography align="center" gutterBottom variant="h4">
            Have you experienced symptoms of COVID-19 in the last four months?
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            There is a shortage of COVID-19 test-kits around the world and many
            of us with symptoms aren't being counted. Add your case to the
            public map and get counted so that we can estimate the true spread
            of the virus. Let's fight COVID-19 together.
          </Typography>
          <Grid container justify="center">
            <Button
              variant="contained"
              color="secondary"
              to="/self-report"
              component={RouteLink}
              onClick={handleClose}
              size="large"
              className={classes.symptomsBtn}
            >
              Add symptoms
            </Button>
          </Grid>
          <Typography align="center" gutterBottom variant="subtitle2">
            This is an open source public data project -{' '}
            <Link href="/about#our-story">Read our story and learn more</Link>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            View symptoms map
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
