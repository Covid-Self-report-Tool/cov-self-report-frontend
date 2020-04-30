import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

export const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    '.simpler-font': {
      fontFamily: "'Roboto', sans-serif",
    },
  },
})(() => null);

const themeNonResponsiveFont = createMuiTheme({
  overrides: {
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
  },
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

export const theme = responsiveFontSizes(themeNonResponsiveFont);
