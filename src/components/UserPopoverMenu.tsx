import React from 'react';
import { FirebaseAuthConsumer } from '@react-firebase/auth';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { logOut } from 'utils';

const useStyles = makeStyles(theme => ({
  // Kind of a fight to prevent hover stuff on the non-clickable info
  userInfo: {
    '* &:hover': {
      cursor: 'default',
      // NOTE: if we switch to a dark theme this will look like 💩
      backgroundColor: theme.palette.common.white,
    },
  },
  exitIcon: {
    marginRight: theme.spacing(4),
  },
}));

export default function UserPopoverMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();

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
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/*
          NOTE: if there is no user.email, this section will look silly. Not 
          sure if this will be the case w/Google auth but if so then need a 
          check to determine if this should be shown.
        */}
        <MenuItem className={useStyles().userInfo}>
          <ListItemText
            className={useStyles().userInfo}
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
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            logOut(history);
          }}
        >
          <ExitToAppIcon fontSize="small" className={useStyles().exitIcon} />
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  );
}
