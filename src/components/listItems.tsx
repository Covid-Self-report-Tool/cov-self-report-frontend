import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import BarChartIcon from '@material-ui/icons/BarChart';
import InfoIcon from '@material-ui/icons/Info';

type ListItemsProps = {
  classes: {
    navItem: string;
  };
};

export const MainListItems: FC<ListItemsProps> = ({ classes }) => (
  <div>
    <ListItem button>
      <Link to="/" component={RouterLink} className={classes.navItem}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link to="/list" component={RouterLink} className={classes.navItem}>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="List" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link to="/models" component={RouterLink} className={classes.navItem}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Models" />
      </Link>
    </ListItem>
    <ListItem button>
      <Link to="/about" component={RouterLink} className={classes.navItem}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </Link>
    </ListItem>
  </div>
);
