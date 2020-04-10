import React, { FC } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  list: {
    width: 100,
  },
});

type OffCanvasTypes = {
  drawerOpen: boolean;
  toggleDrawerOpen: (active: boolean) => void;
  children?: React.ReactNode;
};

export const MobileOffCanvasNav: FC<OffCanvasTypes> = ({
  drawerOpen,
  toggleDrawerOpen,
  children,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const bigGuy = useMediaQuery(theme.breakpoints.up('sm'));

  if (bigGuy) {
    return <>{children}</>;
  }

  return (
    <Drawer open={drawerOpen} onClose={() => toggleDrawerOpen(false)}>
      <div
        className={classes.list}
        role="presentation"
        onClick={() => toggleDrawerOpen(false)}
        onKeyDown={() => toggleDrawerOpen(false)}
      >
        {children}
      </div>
    </Drawer>
  );
};
