import React, { FC, useContext } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
  Typography,
  useMediaQuery,
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

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: theme.palette.success.main,
    marginRight: 4,
  },
  dialog: {
    // DialogTitle child is created dynamically as a <Typography> component. Can
    // disable that but then we lose the consistency w/the other dialog titles.
    '& .MuiDialogTitle-root > .MuiTypography-root': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  divider: {
    margin: theme.spacing(2),
  },
}));

export const SuccessConfModal: FC<SuccessConfModalTypes> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { dispatch } = useContext(GlobalContext);
  const { open, setOpen } = props;
  const { data: submissions } = useSubmitted(dispatch);
  const smallAndUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      fullScreen={!smallAndUp}
      data-cy="successful-submission"
      transitionDuration={{ enter: 900, exit: 400 }}
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className={classes.dialog}
    >
      <DialogTitle id="alert-dialog-slide-title">
        <CheckCircleRoundedIcon className={classes.icon} />
        Submission sent
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <Typography align="center">
          Thank you for contributing! So far,{' '}
          {submissions && submissions.length} users like you have added
          themselves to the world map.
        </Typography>
        <Divider variant="middle" className={classes.divider} />
        <ShareButtons />
        <Typography variant="h5" paragraph>
          What you can do next:
        </Typography>
        <ol className="simpler-font" style={{ fontSize: 16, paddingLeft: 30 }}>
          <li>
            Share this with your friends and family by using the share buttons
            above.
          </li>
          <li>
            Provide your{' '}
            <a
              target="_blank"
              className="obvious-link"
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
              className="obvious-link"
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
        <Disclaimer />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
