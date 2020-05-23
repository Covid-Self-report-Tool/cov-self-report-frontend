import React, { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Fab, Popover, Box } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';

import { ShareButtons } from 'components';

const useStyles = makeStyles((theme: Theme) => ({
  shareBtn: {
    [theme.breakpoints.down(321)]: { display: 'none' },
  },
  shareBtnMobile: {
    borderRadius: '100%',
    [theme.breakpoints.up(321)]: {
      display: 'none',
    },
  },
}));

export const SharingPopoutMenu: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Fab
        size="small"
        aria-label="share"
        color="secondary"
        aria-describedby="long-menu"
        className={classes.shareBtnMobile}
        onClick={handleClick}
      >
        <ShareIcon />
      </Fab>
      <Fab
        variant="extended"
        size="small"
        aria-label="share"
        color="secondary"
        aria-describedby="long-menu"
        className={classes.shareBtn}
        onClick={handleClick}
      >
        <ShareIcon />
        Share
      </Fab>
      <Popover
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box onClick={handleClose} padding={2}>
          <ShareButtons />
        </Box>
      </Popover>
    </div>
  );
};
