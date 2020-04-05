import React, { FC } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { MainListItems } from './listItems';

type SidebarProps = {
  classes: {
    drawerPaper: string;
    drawerPaperClose: string;
    toolbarIcon: string;
    navItem: string;
  };
  handleDrawerClose: () => void;
  open: boolean | undefined;
};

const Sidebar: FC<SidebarProps> = ({ classes, handleDrawerClose, open }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
    }}
    // TODO: start collapsed on small screens
    open={open}
  >
    <div className={classes.toolbarIcon}>
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <List>
      <MainListItems classes={{ navItem: classes.navItem }} />
    </List>
  </Drawer>
);

export default Sidebar;
