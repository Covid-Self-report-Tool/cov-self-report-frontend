import React, { FC, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link } from '@material-ui/core';

import { LegendSymbolBarTypes } from './types';
import { GlobalContext } from 'components';
import { SetCountriesSymb } from 'components/ticker-cards';

const useStyles = makeStyles(theme => ({
  barLabels: {
    fontSize: 12,
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.background.default,
    '& > *': {
      lineHeight: 1,
      marginTop: 4,
    },
  },
  tickerFooterLink: {
    fontSize: 14,
    color: theme.palette.info.main,
    display: 'block',
  },
}));

export const LegendSymbolBar: FC<LegendSymbolBarTypes> = ({
  colorStops,
  globalStateKey,
}) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(GlobalContext);
  const active = state.activeCountrySymbKey === globalStateKey;

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch({ type: 'SET_COUNTRY_SYMBOLOGY', payload: globalStateKey });
  };

  return (
    <>
      {active ? (
        <>
          <Box display="flex" justifyContent="center">
            <Box
              width="100%"
              height={6}
              borderRadius={2}
              style={{
                backgroundImage: `linear-gradient(to right, ${colorStops.join(
                  ', '
                )})`,
              }}
            />
          </Box>
          <Box className={classes.barLabels}>
            <span>LOW</span>
            <span>HIGH</span>
          </Box>
        </>
      ) : (
        <SetCountriesSymb
          className={classes.tickerFooterLink}
          globalStateKey={globalStateKey}
        />
      )}
    </>
  );
};
