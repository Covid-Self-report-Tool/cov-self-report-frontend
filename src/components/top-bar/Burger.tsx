import React, { FC } from 'react';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { NavBarTypes, MuiClassList } from 'types/top-bar';

type BurgerTypes = Omit<NavBarTypes, 'isHome'> & MuiClassList;

export const Burger: FC<BurgerTypes> = ({
  toggleDrawerOpen,
  drawerOpen,
  classes = {},
}) => (
  <IconButton
    edge="start"
    className={classes.burger}
    aria-label="menu"
    onClick={() => toggleDrawerOpen(!drawerOpen)}
  >
    <MenuIcon />
  </IconButton>
);
