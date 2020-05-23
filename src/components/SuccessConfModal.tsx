import React, { FC, useContext } from 'react';
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
import { GlobalContext, ShareButtons } from 'components';
import { Disclaimer } from './Disclaimer';
import { useSubmitted } from '../utils/queries';


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
    dialogContent: {
      '& a': {
        color: theme.palette.info.main,
      },
    },
    disclaimer: {
      fontSize: 13,
    },
  }),
);

export const SuccessConfModal: FC<SuccessConfModalTypes> = props => {
  const { open, setOpen } = props;
  const classes = useStyles();

  const { state, dispatch } = useContext(GlobalContext);
  const { data: submissions } = useSubmitted(dispatch);

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
      <DialogContent dividers className={classes.dialogContent}>
        <Typography variant="h2" align="center" className={classes.iconWrap}>
          <CheckCircleRoundedIcon className={classes.icon} fontSize="inherit" />
        </Typography>
        <DialogContentText
          id="alert-dialog-slide-description"
          className={`simpler-font`}
          variant="body2"
        >
          <p>
            Thank you for contributing! So far, {submissions && submissions.length} users like you have
            added themselves to the world map.
          </p>
          <p>
            <ShareButtons/>
          </p>
          <p>
            <DialogContentText
              id="alert-dialog-slide-description"
              variant="body2"
            >
              What you can do next:
            </DialogContentText>
            <ol>
              <li>
                Share this with your friends and family by using the share buttons above.
              </li>
              <li>
                Share your{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfkQJMihQUlA6scYvjr1A1OZiXGRRxQLkD1YIiklGDq5YTclQ/viewform?usp=sf_link"
                >
                  thoughts and feedback
                </a>
                .
              </li>
              <li>
                Learn more about your symptoms at the{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                >
                  World Health Organization’s COVID-19 page
                </a>
                .
              </li>
              <li>
                Come back soon and get updates on trends of potential and confirmed
                infections in your area.
              </li>
            </ol>
          </p>
          <div className={classes.disclaimer}>
            <Disclaimer/>
          </div>
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
