import React, { FC, useContext } from 'react';

import { WorldGraphLocation, TickerCards } from 'components';
import { GlobalContext } from 'components';

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
