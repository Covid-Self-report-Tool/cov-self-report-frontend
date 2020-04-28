import React, { useContext } from 'react';
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logOut } from 'utils/firebase';
import { UserContext } from 'context';

const useStyles = makeStyles(theme => ({
  // Kind of a fight to prevent hover stuff on the non-clickable info
  noBgChangeOnHover: {
    '* &:hover': {
      cursor: 'default',
      backgroundColor: theme.palette.background.paper,
    },
  },
  exitIcon: {
    marginRight: theme.spacing(4),
  },
  avatar: {
    // Let the top bar gutter have the final say, otherwise it doesn't fit in
    // phone portrait without wrapping.
    padding: 0,
    marginLeft: 2,
  },
}));

export function UserPopoverMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  const classes = useStyles();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.avatar}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        disableAutoFocusItem
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/*
          NOTE: if there is no user.email, this section will look silly. Not 
          sure if this will be the case w/Google auth but if so then need a 
          check to determine if this should be shown.
        */}
        <MenuItem className={classes.noBgChangeOnHover} divider>
          <ListItemText
            className={classes.noBgChangeOnHover}
            primary={
              <>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  Signed in as
                </Typography>
                <FirebaseAuthConsumer>
                  {({ user }) => user.email}
                </FirebaseAuthConsumer>
              </>
            }
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            logOut(history, dispatch);
          }}
        >
          <ExitToAppIcon fontSize="small" className={classes.exitIcon} />
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
}
