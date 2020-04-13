import React, { FC } from 'react';

import { WorldGraphLocation, TickerCards, useStore } from 'components';

export const Home: FC = () => {
  const store = useStore();
  const { confirmed, deaths, recovered, selfReported } = store.currentTotals;

  return (
    <>
      <WorldGraphLocation
        data={store.countries}
        submittedFeats={store.allSelfReportedPoints}
      />
      <TickerCards
        confirmed={confirmed}
        deaths={deaths}
        recovered={recovered}
        selfReported={selfReported}
      />
    </>
  );
};
