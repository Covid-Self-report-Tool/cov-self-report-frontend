import React, { FC, useContext } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { GlobalContext } from 'context';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const useStyles = makeStyles(theme => ({
  symptomsBtn: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
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
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          COVID-19 Self-reporting Tool
        </DialogTitle>
        <DialogContent dividers>
          <Typography align="center" gutterBottom variant="h4">
            Are you experiencing COVID-19 symptoms, but cannot get tested?
          </Typography>
          <Typography align="center" gutterBottom>
            Help us understand COVID-19 by adding your case to the world map, so
            that we can understand the true spread of the virus.
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Go to map
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
