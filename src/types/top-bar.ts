export type MuiClassList = {
  classes: {
    [key: string]: string;
  };
};

export type NavBarTypes = {
  isHome: boolean;
  drawerOpen: boolean;
  toggleDrawerOpen: (active: boolean) => void;
};
