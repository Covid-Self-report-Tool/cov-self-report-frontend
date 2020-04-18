import React, { FC, useContext } from 'react';
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

import { CurrentTotalsTypes } from 'types/context';
import { prettyPrint } from 'utils';
import Title from './Title';
import { GlobalContext } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 4,
    overflow: 'auto',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(2),
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(1),
      width: 135,
    },
  },
  popover: {
    width: 250,
  },
  definitionText: {
    whiteSpace: 'pre-wrap',
  },
  tickerVal: {
    color: theme.palette.common.black,
    fontSize: '1.9rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '2.3rem',
    },
  },
  tickerCardsWrap: {
    position: 'absolute',
    zIndex: 400,
    [theme.breakpoints.down('sm')]: {
      bottom: 16, // above attribution
      display: 'grid',
      gridColumnGap: 8,
      gridTemplateColumns: 'repeat(2, 1fr)',
      right: 8,
      width: 250,
    },
    [theme.breakpoints.up('md')]: {
      right: theme.spacing(2),
      top: 115, // past top bar (except on tweeners like iPhone landscape)
    },
  },
  infoBtn: {
    padding: 0,
    position: 'absolute',
    top: 3,
    right: 3,
    fontSize: '1rem',
  },
}));

type TickerCard = {
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
  const classes = useStyles();
  const { state } = useContext(GlobalContext);

  // TODO: make this not fail when a date string isn't passed.
  const lastUpdated = new Date(state.lastUpdated);
  const prettyLastUpdated = `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`;
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
          subheader={<ListSubheader>{defTerm}</ListSubheader>}
          component="ul"
          className={classes.popover}
        >
          <ListItem className={classes.definitionText}>{defText}</ListItem>
          <ListItem divider>
            <Typography variant="caption" color="textSecondary">
              LAST UPDATED: {prettyLastUpdated}
            </Typography>
          </ListItem>
          <ListItem component={RouteLink} to="/about" onClick={handleClose}>
            View info
          </ListItem>
        </List>
      </Popover>
    </>
  );
}

const NotifierCard: FC<TickerCard> = props => {
  const classes = useStyles();

  return (
    <Grid item className={classes.root}>
      <Paper className={classes.paper}>
        <Title>{props.text}</Title>
        <Typography component="p" variant="h4" className={classes.tickerVal}>
          {prettyPrint(props.number)}
        </Typography>
        <DefPopoverMenu />
      </Paper>
    </Grid>
  );
};

export const TickerCards: FC<CurrentTotalsTypes> = ({
  confirmed,
  deaths,
  recovered,
  selfReported,
}) => (
  <div className={useStyles().tickerCardsWrap}>
    <NotifierCard text="Self-reported" number={selfReported} />
    <NotifierCard text="Recovered" number={recovered} />
    <NotifierCard text="Confirmed" number={confirmed} />
    <NotifierCard text="Deaths" number={deaths} />
  </div>
);
