import { makeStyles } from '@material-ui/core/styles';

import { SELF_REPORTED_STYLES } from 'config/map';

export const useStyles = makeStyles(theme => ({
  root: {
    // Self-reported markers in map, legend, etc. Includes clusters. Note that
    // the parent needs a height/width since this child is 100%.
    '& .self-reported-symbol': {
      backgroundColor: SELF_REPORTED_STYLES.fillColor,
      borderWidth: SELF_REPORTED_STYLES.borderWidth,
      borderStyle: 'solid',
      borderColor: SELF_REPORTED_STYLES.borderColor,
      borderRadius: '100%',
      width: '100%',
      height: '100%',
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    display: 'flex',
    overflow: 'auto',
    marginTop: '10rem',
    marginBottom: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.breakpoints.values.sm,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: theme.breakpoints.values.md,
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
