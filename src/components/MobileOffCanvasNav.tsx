import React, { FC } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
  const theme = useTheme();
  const bigGuy = useMediaQuery(theme.breakpoints.up('md'));

  // Show only on wide portrait and up
  if (bigGuy) {
    return <>{children}</>;
  }

  return (
    <Drawer open={drawerOpen} onClose={() => toggleDrawerOpen(false)}>
      <div
        role="presentation"
        onClick={() => toggleDrawerOpen(false)}
        onKeyDown={() => toggleDrawerOpen(false)}
      >
        {children}
      </div>
    </Drawer>
  );
};
