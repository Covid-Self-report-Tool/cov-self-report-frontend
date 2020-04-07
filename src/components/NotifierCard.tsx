import React, { FC } from 'react';
import clsx from 'clsx';
import { Link as RouteLink } from 'react-router-dom';
import {
  ListSubheader,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  Popover,
  IconButton,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';

import { prettyPrint } from 'utils';
import Title from './Title';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    overflow: 'auto',
    padding: theme.spacing(1),
    position: 'relative',
    width: 200,
  },
  popover: {
    width: 250,
  },
  definitionText: {
    whiteSpace: 'pre-wrap',
  },
  tickerVal: {
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
}));

type NotifierCard = {
  text: string;
  number: number;
};

// A popover menu and toggle button to show a term and its definition. For now
// just links to "/about" route. May want sub-routes or at least "#section-id"
// for scrolling directly to sections.
function DefPopoverMenu({
  defText = 'Definition goes here. Should be short and straightforward.',
  defTerm = 'Def term',
}: {
  defText?: string;
  defTerm?: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const definitionClassname = clsx(useStyles().definitionText);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="ticker-info-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <InfoIcon color="primary" fontSize="inherit" />
      </IconButton>
      <Popover
        id="ticker-info-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        classes={{ paper: useStyles().popover }}
      >
        <List
          subheader={<ListSubheader>{defTerm}</ListSubheader>}
          component="ul"
          className={useStyles().popover}
        >
          <ListItem className={definitionClassname}>{defText}</ListItem>
          <ListItem divider>
            <Typography variant="caption" color="textSecondary">
              LAST UPDATED: date/time if possible
            </Typography>
          </ListItem>
          <ListItem component={RouteLink} to="/about" onClick={handleClose}>
            View info
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}

export const NotifierCard: FC<NotifierCard> = props => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Paper className={classes.paper}>
        <Title>
          {props.text}
          <DefPopoverMenu />
        </Title>
        <Typography component="p" variant="h4" className={classes.tickerVal}>
          {prettyPrint(props.number)}
        </Typography>
      </Paper>
    </Grid>
  );
};
