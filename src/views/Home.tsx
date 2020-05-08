import React, { FC, useContext, useEffect } from 'react';
import { Box, Link } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from 'config/firebase';
import { tickersConfig } from 'config/map';

import { GlobalContext, SharingPopoutMenu, SplashScreen } from 'components';
import { TickerCards } from 'components/ticker-cards';
import { Map } from 'components/map';
import { calculateTotals } from 'utils';
import { useCountryTotals, useSubmitted } from 'utils/queries';

export const Home: FC = () => {
  const { state, dispatch } = useContext(GlobalContext);

  let [totalConfirmed, totalDeaths, totalRecovered] = [0, 0, 0];

  const { data: submissions } = useSubmitted(dispatch);
  const { data: countryTotals, status: countryTotalsStatus } = useCountryTotals(
    dispatch
  ); // useQuery('countryTotals', getCountryGeoJSONData, { staleTime: 300000 });

  const [user, loading] = useAuthState(firebase.auth());

  if (countryTotalsStatus === 'success' && countryTotals) {
    ({
      total_confirmed: totalConfirmed,
      total_deaths: totalDeaths,
      total_recovered: totalRecovered,
    } = calculateTotals(countryTotals, {
      total_confirmed: 0,
      total_deaths: 0,
      total_recovered: 0,
    }));
  }

  // this only shows the splash screen once, to users that haven't logged in
  useEffect(() => {
    if (!loading && !state.hasSeenSplash) {
      if (!user) {
        dispatch({ type: 'SHOW_SPLASH', payload: true });
      } else {
        dispatch({ type: 'SHOW_SPLASH', payload: false });
      }
    }
  }, [loading, user, dispatch, state.hasSeenSplash]);

  return (
    <>
      <SplashScreen />
      <Box position="absolute" bottom={29} left={8} zIndex={1}>
        <SharingPopoutMenu />
      </Box>
      <Box position="absolute" bottom={0} left={8} zIndex={1}>
        <Link href="/terms-of-service" color="textSecondary">
          Terms of service
        </Link>
      </Box>
      <Map data={countryTotals || []} submittedFeats={submissions} />
      <TickerCards
        config={tickersConfig}
        data={{
          confirmed: totalConfirmed,
          deaths: totalDeaths,
          recovered: totalRecovered,
          selfReported: submissions && submissions.length,
        }}
      />
    </>
  );
};
