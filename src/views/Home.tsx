import React, { FC } from 'react';

import { WorldGraphLocation, TickerCards, useStore } from 'components';

export const Home: FC = () => {
  const store = useStore();
  const {
    total_confirmed,
    total_deaths,
    total_recovered,
    selfReported,
  } = store.currentTotals;

  return (
    <>
      <WorldGraphLocation
        data={store.countries}
        submittedFeats={store.allSelfReportedPoints}
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
