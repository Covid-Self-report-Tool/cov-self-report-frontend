import React, { FC, useContext } from 'react';
import { Box } from '@material-ui/core';

import { WorldGraphLocation, TickerCards } from 'components';
import { GlobalContext, SharingPopoutMenu, SplashScreen } from 'components';

export const Home: FC = () => {
  const { state } = useContext(GlobalContext);
  const {
    total_confirmed,
    total_deaths,
    total_recovered,
    selfReported,
  } = state.currentTotals;

  return (
    <>
      <SplashScreen />
      <Box position="absolute" bottom={10} left={10} zIndex={1}>
        <SharingPopoutMenu />
      </Box>
      <WorldGraphLocation
        data={state.countries}
        submittedFeats={state.allSelfReportedPoints}
      />
      <TickerCards
        confirmed={total_confirmed}
        deaths={total_deaths}
        recovered={total_recovered}
        selfReported={selfReported}
      />
    </>
  );
};
