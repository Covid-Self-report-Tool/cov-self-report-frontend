import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import { ShareButtons } from 'components';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SuccessConfModalTypes {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.success.main,
    },
    iconWrap: {
      marginBottom: 0,
      lineHeight: 0,
    },
  })
);

export const SuccessConfModal: FC<SuccessConfModalTypes> = props => {
  const { open, setOpen } = props;
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      data-cy="successful-submission"
      transitionDuration={{ enter: 900, exit: 400 }}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Submission sent successfully
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h2" align="center" className={classes.iconWrap}>
          <CheckCircleRoundedIcon className={classes.icon} fontSize="inherit" />
        </Typography>
        <DialogContentText
          id="alert-dialog-slide-description"
          className={`simpler-font`}
          variant="body2"
        >
          <p>
            Thank you for adding your case to the world map. You're helping us
            understand COVID-19 so that we can fight it together. Please share
            this with friends who are unwell. Send us your{' '}
            <a
              target="_blank"
              className="obvious-link"
              rel="noopener noreferrer"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfkQJMihQUlA6scYvjr1A1OZiXGRRxQLkD1YIiklGDq5YTclQ/viewform?usp=sf_link"
            >
              thoughts and feedback
            </a>
            . Sign up for email updates on the project.
          </p>
          <p>
            To get support and learn more about COVID-19, please visit the{' '}
            <a
              target="_blank"
              className="obvious-link"
              rel="noopener noreferrer"
              href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
            >
              World Health Organization’s COVID-19 page
            </a>
            .
          </p>
          <p>
            <ShareButtons />
          </p>
          <p>
            COMING SOON: Get updates on current infections in your area and how
            they are changing.
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
