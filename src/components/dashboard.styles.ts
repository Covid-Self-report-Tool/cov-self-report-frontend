import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
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
