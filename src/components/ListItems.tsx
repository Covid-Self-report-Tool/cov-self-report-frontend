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
  const navItemSize = 60;
  const shadow = '1px 1px 3px hsla(180, 2%, 10%, 0.75)';

  return {
    list: {
      left: 0,
      position: 'fixed',
      top: theme.spacing(4),
      zIndex: 401,
      [theme.breakpoints.up('sm')]: {
        top: 105, // past top bar (except on tweeners like iPhone landscape)
      },
    },
    navItem: {
      alignItems: 'center',
      color: theme.palette.common.white,
      display: 'flex',
      flexDirection: 'column',
      height: navItemSize,
      justifyContent: 'center',
      textAlign: 'center',
      width: navItemSize,
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
export const ListItems: React.FC = () => (
  <List className={useStyles().list}>
    <ListItem button>
      <Link to="/" component={RouterLink} className={useStyles().navItem}>
        <MapIcon />
        <ListItemText
          primary={<Typography variant="overline">Map</Typography>}
        />
      </Link>
    </ListItem>
    <ListItem button>
      <Link to="/list" component={RouterLink} className={useStyles().navItem}>
        <ListIcon />
        <ListItemText
          primary={<Typography variant="overline">List</Typography>}
        />
      </Link>
    </ListItem>
    <ListItem button>
      <Link to="/models" component={RouterLink} className={useStyles().navItem}>
        <BarChartIcon />
        <ListItemText
          primary={<Typography variant="overline">Models</Typography>}
        />
      </Link>
    </ListItem>
    <ListItem button>
      <Link to="/about" component={RouterLink} className={useStyles().navItem}>
        <InfoIcon />
        <ListItemText
          primary={<Typography variant="overline">About</Typography>}
        />
      </Link>
    </ListItem>
  </List>
);
