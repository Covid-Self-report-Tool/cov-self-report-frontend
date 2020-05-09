import React, { FC } from 'react';
import { Grid, Paper, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  RequiredTotalsKeys,
  TickerTitleTypes,
  TickerCard,
  TickerCardTypes,
} from './types';
import { prettyPrint } from 'utils';
import {
  TickerInfoPopover,
  LegendSymbol,
  LegendSymbolBar,
  ToggleLayer,
} from 'components/ticker-cards';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  paper: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    height: '100%', // fill the grid
    justifyContent: 'center',
    // Little more on the top so the "i" btn doesn't cover the card heading
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px 4px`,
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(1),
      width: 135,
    },
  },
  heading: {
    lineHeight: 1,
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  tickerVal: {
    color: theme.palette.common.black,
    fontSize: '1.9rem',
    marginBottom: 'auto', // make flexbox align nicely
    [theme.breakpoints.up('md')]: {
      fontSize: '2.3rem',
    },
  },
  tickerCardsWrap: {
    position: 'absolute',
    zIndex: 400,
    [theme.breakpoints.down('sm')]: {
      bottom: 20, // above attribution
      display: 'grid',
      gridColumnGap: 6,
      gridRowGap: 6,
      gridTemplateColumns: 'repeat(2, 1fr)',
      right: 6,
      width: 250,
    },
    [theme.breakpoints.up('md')]: {
      right: theme.spacing(2),
      top: 115, // past top bar (except on tweeners like iPhone landscape)
    },
  },
  tickerFooterLink: {
    fontSize: '0.9rem',
    color: theme.palette.info.main,
    display: 'block',
  },
}));

const CardTitle: FC<TickerTitleTypes> = ({ heading, renderLegendSymbol }) => {
  const classes = useStyles();

  return (
    <Typography
      component="h2"
      variant="subtitle2"
      color="primary"
      className={classes.heading}
    >
      {renderLegendSymbol()}
      {heading}
    </Typography>
  );
};

const NotifierCard: FC<TickerCard> = props => {
  const classes = useStyles();
  const { number, renderTitle, renderPopover, renderSymbolBar } = props;

  return (
    <Grid item className={classes.root}>
      <Paper className={classes.paper}>
        {renderTitle()}
        <Typography component="h4" variant="h4" className={classes.tickerVal}>
          {number ? prettyPrint(number) : <CircularProgress size={30} />}
        </Typography>
        <div style={{ minHeight: 24 }}>{renderSymbolBar()}</div>
        {renderPopover()}
      </Paper>
    </Grid>
  );
};

export const TickerCards: FC<TickerCardTypes> = ({ data, config }) => {
  const classes = useStyles();

  return (
    <div className={classes.tickerCardsWrap}>
      {/* TODO: use `keyof` to restrict possible values appropriately */}
      {Object.keys(config).map((key: string) => {
        const { heading, defText, symbol, omitLastUpdated } = config[
          key as RequiredTotalsKeys
        ];

        return (
          <NotifierCard
            key={key}
            heading={heading}
            number={data[key as RequiredTotalsKeys]}
            renderTitle={() => (
              <CardTitle
                heading={heading}
                renderLegendSymbol={() => <LegendSymbol {...symbol} />}
              />
            )}
            renderPopover={() => (
              <TickerInfoPopover
                heading={heading}
                defText={defText}
                omitLastUpdated={omitLastUpdated}
              />
            )}
            renderSymbolBar={() =>
              symbol.colorStops.length && symbol.globalStateKey ? (
                <LegendSymbolBar
                  footerLinkClassName={classes.tickerFooterLink}
                  globalStateKey={symbol.globalStateKey}
                  colorStops={symbol.colorStops}
                />
              ) : (
                <ToggleLayer
                  visibilityKey={key}
                  className={classes.tickerFooterLink}
                />
              )
            }
          />
        );
      })}
    </div>
  );
};
