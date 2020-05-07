import React, { FC, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link } from '@material-ui/core';

import { LegendSymbolBarTypes } from './types';
import { GlobalContext } from 'components';

const useStyles = makeStyles(theme => ({
  barLabels: {
    fontSize: 12,
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.common.black,
    '& > *': {
      lineHeight: 1,
      marginTop: 4,
    },
  },
  setSymbLink: {
    fontSize: 12,
    color: theme.palette.info.main,
    textDecoration: 'underline',
  },
}));

export const LegendSymbolBar: FC<LegendSymbolBarTypes> = ({
  colorStops = ['red', 'green', 'blue'],
  globalStateKey,
}) => {
  const classes = useStyles();
  const { state } = useContext(GlobalContext);
  const active = state.activeCountrySymbKey === globalStateKey;

  return (
    <>
      {active ? (
        <>
          <Box display="flex" justifyContent="center">
            <Box
              width="90%"
              height={4}
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
        <Link href="#" className={classes.setSymbLink}>
          Show
        </Link>
      )}
    </>
  );
};
