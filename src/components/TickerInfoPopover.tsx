import React, { FC, useContext } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import {
  ListSubheader,
  Typography,
  List,
  ListItem,
  Popover,
  IconButton,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';

import { TickerInfoType } from 'types';
import { GlobalContext } from 'components';
import { prettyDate } from 'utils/dates';

const useStyles = makeStyles(theme => ({
  popover: {
    width: 250,
  },
  definitionText: {
    whiteSpace: 'pre-wrap',
  },
  infoBtn: {
    padding: 0,
    position: 'absolute',
    top: 3,
    right: 3,
    fontSize: '1rem',
  },
  viewInfoLink: {
    color: theme.palette.info.main,
    '& :visited': {
      color: theme.palette.info.main,
    },
  },
}));

// A popover menu and toggle button to show a term and its definition. For now
// just links to "/about" route. May want sub-routes or at least "#section-id"
// for scrolling directly to sections.
export const TickerInfoPopover: FC<TickerInfoType> = ({
  defText,
  heading,
  omitLastUpdated,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { state } = useContext(GlobalContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="ticker-info-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
        className={classes.infoBtn}
      >
        <InfoIcon color="primary" fontSize="inherit" />
      </IconButton>
      <Popover
        id="ticker-info-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        classes={{ paper: classes.popover }}
      >
        <List
          subheader={<ListSubheader>{heading}</ListSubheader>}
          component="ul"
          className={classes.popover}
        >
          <ListItem className={classes.definitionText}>{defText}</ListItem>
          <ListItem divider>
            {!omitLastUpdated && (
              <Typography variant="caption" color="textSecondary">
                LAST UPDATED:{' '}
                {state.lastCountriesUpdate
                  ? prettyDate(state.lastCountriesUpdate)
                  : 'N/A'}
              </Typography>
            )}
          </ListItem>
          <ListItem
            component={RouteLink}
            to="/about"
            onClick={handleClose}
            className={classes.viewInfoLink}
          >
            View info
          </ListItem>
        </List>
      </Popover>
    </>
  );
};
