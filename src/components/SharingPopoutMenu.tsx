import React, { FC } from 'react';
import { Fab, Popover, Box } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';

import { ShareButtons } from 'components';

export const SharingPopoutMenu: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Fab
        variant="extended"
        size="small"
        aria-label="share"
        color="secondary"
        aria-describedby="long-menu"
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
