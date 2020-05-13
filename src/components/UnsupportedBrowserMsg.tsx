import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Dialog } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  browserMessage: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    padding: `${theme.spacing(4)}px ${theme.spacing(3)}px `,
  },
}));

export const UnsupportedBrowserMsg: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);

  React.useEffect(() => {
    navigator.registerProtocolHandler(
      'web+safarita',
      'https://pr-29.d3pqoo7mq9yhwf.amplifyapp.com/?src=%s',
      'Safari'
    );
    navigator.registerProtocolHandler(
      'web+chromer',
      'https://pr-29.d3pqoo7mq9yhwf.amplifyapp.com/?orig=%s',
      'Chrome'
    );
    navigator.registerProtocolHandler(
      'web+googchrome',
      'https://pr-29.d3pqoo7mq9yhwf.amplifyapp.com/?tester=%s',
      'Google Chrome'
    );
    // debugger;
  }, []);

  const handleClose = () => {
    setOpen(false);
    history.push('/');
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
    >
      <div className={classes.browserMessage}>
        <Typography align="center" gutterBottom variant="h4">
          Unsupported Browser
        </Typography>
        <ul>
          <li>
            <a href="web+safarita:ok" target="_blank">
              Safari
            </a>
          </li>
          <li>
            <a href="web+chromer:ok" target="_blank">
              Chrome
            </a>
          </li>
          <li>
            <a href="web+googchrome:ok" target="_blank">
              Google Chrome
            </a>
          </li>
        </ul>
        <p>
          To submit your report, please open this site in a supported browser
          such as Safari or Google Chrome.
        </p>
        <Button color="secondary" variant="contained" onClick={handleClose}>
          Exit to map
        </Button>
      </div>
    </Dialog>
  );
};
