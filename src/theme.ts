import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

export const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    '.simpler-font': {
      fontFamily: "'Roboto', sans-serif",
    },
    // Pushes it to left, but not if it's the only element in the actions
    '.MuiDialogActions-root > *:first-child:not(:last-child)': {
      marginRight: 'auto',
    },
    // Includes <a> elems styled as buttons (e.g. "Cancel")
    '.MuiDialogActions-root > .MuiButtonBase-root': {
      minWidth: 40, // override 60px default (too big for sm btns like "Back")
    },
  },
})(() => null);

// Easy access to theme properties when used in `createMuiTheme` overrides
// CRED: https://stackoverflow.com/a/57127040/1048518
const covidTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: grey,
  },
  typography: {
    fontFamily: [
      'Bebas Neue',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 18,
  },
});

// Dialogs with dividers are a separate class from those without
const dialogContentPadding = {
  padding: `${covidTheme.spacing(3)}px 12px`,
  [covidTheme.breakpoints.up('sm')]: {
    padding: covidTheme.spacing(3),
  },
};

// Dialog title and actions look pretty good with similar spacing
const dialogHeadFootSpacing = {
  padding: '8px 12px',
  [covidTheme.breakpoints.up('sm')]: {
    padding: '12px 16px',
  },
};

// Global overrides of MUI components that need to be re-styled often
covidTheme.overrides = {
  MuiInput: {
    // Bebas is bad news for <input> since it lacks lowercase. Will also apply
    // Roboto to textful pages like <About>.
    root: { fontFamily: "'Roboto', sans-serif" },
  },
  MuiDialog: {
    // Outside boundary of all dialogs
    paper: {
      margin: 12,
    },
    // e.g. splash screen
    paperScrollPaper: {
      maxHeight: 'calc(100% - 24px)',
    },
    paperFullWidth: {
      maxHeight: 'calc(100% - 24px)',
      width: 'calc(100% - 16px)',
    },
  },
  MuiDialogTitle: {
    root: dialogHeadFootSpacing,
  },
  MuiDialogActions: {
    root: dialogHeadFootSpacing,
  },
  MuiDialogContent: {
    root: dialogContentPadding,
    dividers: dialogContentPadding,
  },
};

export const theme = responsiveFontSizes(covidTheme);
