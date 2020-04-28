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
  const wideTabletPortraitAndUp = useMediaQuery(theme.breakpoints.up('md'));

  // Hide on larger than wide tablet portrait. While there is plenty of room
  // on screens that wide in portrait, if people turn their phones sideways
  // to landscape, they won't see the menu. 🙄
  if (wideTabletPortraitAndUp) {
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
