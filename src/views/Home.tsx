import React, { FC } from 'react';

import { WorldGraphLocation, TickerCards, useStore } from 'components';

export const Home: FC = () => {
  const store = useStore();
  const { confirmed, dead, recovered, submitted } = store.currentTotals;

  return (
    <>
      <WorldGraphLocation
        data={store.countries}
        submittedFeats={store.allSelfSubmittedPoints}
      />
      <TickerCards
        confirmed={confirmed}
        deaths={dead}
        recovered={recovered}
        submitted={submitted}
      />
    </>
  );
};
