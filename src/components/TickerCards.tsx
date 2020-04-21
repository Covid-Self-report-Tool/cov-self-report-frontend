import React, { FC } from 'react';
import { Grid, Paper, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TickerInfoType } from 'types';
import { CurrentTotalsTypes } from 'context/types';
import { prettyPrint } from 'utils';
import { TickerInfoPopover } from 'components';

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
  heading: {
    lineHeight: 1,
    fontSize: '1rem',
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
}));

interface TickerCard extends TickerInfoType {
  heading: string;
  number: number;
  omitLastUpdated?: boolean;
}

interface CardTitleTypes {
  heading: string;
}

const CardTitle: FC<CardTitleTypes> = ({ heading }) => {
  const classes = useStyles();

  return (
    <Typography
      component="h2"
      variant="subtitle2"
      color="primary"
      className={classes.heading}
    >
      {heading}
    </Typography>
  );
};

const NotifierCard: FC<TickerCard> = props => {
  const classes = useStyles();
  const { heading, number } = props;

  return (
    <Grid item className={classes.root}>
      <Paper className={classes.paper}>
        <CardTitle heading={heading} />
        <Typography component="p" variant="h4" className={classes.tickerVal}>
          {number ? prettyPrint(number) : <CircularProgress size={30} />}
        </Typography>
        <TickerInfoPopover {...props} />
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
    <NotifierCard
      defText="Number of individuals who have reported their data on this site"
      heading="Self-reported"
      number={selfReported}
      omitLastUpdated
    />
    <NotifierCard
      defText="Number of individuals clinically confirmed positive for COVID-19 with a test, who have recovered from symptoms"
      heading="Recovered"
      number={recovered}
    />
    <NotifierCard
      defText="Number of individuals clinically confirmed positive for COVID-19 with a test"
      heading="Confirmed"
      number={confirmed}
    />
    <NotifierCard
      defText="Number of individuals clinically confirmed positive for COVID-19 with a test, who have died from complications related to illness caused by COVID-19"
      heading="Deaths"
      number={deaths}
    />
  </div>
);
