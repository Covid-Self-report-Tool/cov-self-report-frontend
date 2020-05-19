import React, { FC, useContext } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Typography, Link, Popover } from '@material-ui/core';

import { GlobalContext } from 'components';

const useStyles = makeStyles((theme: Theme) => ({
  tinyText: {
    fontSize: '0.85rem',
  },
  popover: {
    maxWidth: 320,
  },
}));

export const AcctReqExplain: FC = () => {
  const { dispatch } = useContext(GlobalContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box marginBottom={1}>
      <div className={classes.tinyText}>
        <Link
          aria-label="account reason explanation"
          aria-haspopup="true"
          href="#"
          onClick={handleClick}
          className="obvious-link"
        >
          Why do I need to sign up?
        </Link>{' '}
        Already have an account?{' '}
        <Link
          href="#"
          className="obvious-link"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();

            dispatch({
              type: 'TOGGLE_LOGIN_SIGNUP_MODAL',
              payload: 'login',
            });
          }}
        >
          Sign in.
        </Link>
        .
      </div>
      <Popover
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.popover }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Box onClick={handleClose} padding={2}>
          <Typography variant="h5">Why do I need to sign up?</Typography>
          <p>
            <small className="simpler-font">
              Please confirm you are human and prevent duplicate data by signing
              in.
            </small>
          </p>
          <Typography variant="h6">Is my info safe?</Typography>
          <p>
            <small className="simpler-font">
              Your data will remain anonymous and public. Neither Google,
              Facebook, nor your email provider will receive any data you
              provide on this website. We use Firebase for secure logins and
              will never store your password on this website. Read our{' '}
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="obvious-link"
              >
                privacy policy
              </Link>{' '}
              to learn more.
            </small>
          </p>
          <Box textAlign="right">
            <Link href="#" onClick={handleClose}>
              Close
            </Link>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};
