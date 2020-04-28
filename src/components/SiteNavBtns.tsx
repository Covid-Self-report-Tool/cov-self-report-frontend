import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import ListIcon from '@material-ui/icons/List';
import BarChartIcon from '@material-ui/icons/BarChart';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => {
  const navItemSize = 80; // TODO: make consistent with MobileOffCanvas
  const shadow = '1px 1px 3px hsla(180, 2%, 10%, 0.75)';

  return {
    list: {
      paddingTop: theme.spacing(4),
      [theme.breakpoints.up('md')]: {
        left: 0,
        zIndex: 401,
        position: 'fixed',
        top: 115, // past top bar on wide portrait and above
      },
    },
    listItem: {
      height: navItemSize,
      justifyContent: 'center',
    },
    navItemLink: {
      alignItems: 'center',
      color: theme.palette.common.white,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textShadow: shadow,
      '& svg': {
        // CRED: https://stackoverflow.com/a/13624469/1048518
        WebkitFilter: `drop-shadow(${shadow})`,
        filter: `drop-shadow(${shadow})`,
      },
    },
  };
});

// The top-level nav btns in sidebar or wherever
export const SiteNavBtns: React.FC = () => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem button component="li" className={classes.listItem}>
        <Link to="/" component={RouterLink} className={classes.navItemLink}>
          <MapIcon />
          <ListItemText
            primary={<Typography variant="subtitle2">Map</Typography>}
          />
        </Link>
      </ListItem>
      <ListItem button component="li" className={classes.listItem}>
        <Link to="/list" component={RouterLink} className={classes.navItemLink}>
          <ListIcon />
          <ListItemText
            primary={<Typography variant="subtitle2">List</Typography>}
          />
        </Link>
      </ListItem>
      <ListItem button component="li" className={classes.listItem}>
        <Link
          to="/models"
          component={RouterLink}
          className={classes.navItemLink}
        >
          <BarChartIcon />
          <ListItemText
            primary={<Typography variant="subtitle2">Models</Typography>}
          />
        </Link>
      </ListItem>
      <ListItem button component="li" className={classes.listItem}>
        <Link
          to="/about"
          component={RouterLink}
          className={classes.navItemLink}
        >
          <InfoIcon />
          <ListItemText
            primary={<Typography variant="subtitle2">About</Typography>}
          />
        </Link>
      </ListItem>
    </List>
  );
};
