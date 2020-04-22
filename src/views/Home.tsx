import React, { FC, useContext, useEffect } from 'react';
import { Box, Link } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from 'config/firebase';
import { tickersConfig } from 'config/map';

import {
  WorldGraphLocation,
  TickerCards,
  GlobalContext,
  SharingPopoutMenu,
  SplashScreen,
} from 'components';

export const Home: FC = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const {
    total_confirmed,
    total_deaths,
    total_recovered,
    selfReported,
  } = state.currentTotals;
  const [user, loading] = useAuthState(firebase.auth());

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
      <Box position="absolute" bottom={26} left={8} zIndex={1}>
        <SharingPopoutMenu />
      </Box>
      <Box position="absolute" bottom={0} left={8} zIndex={1}>
        <Link href="/terms-of-service" color="textSecondary">
          Terms of service
        </Link>
      </Box>
      <WorldGraphLocation
        data={state.countries}
        submittedFeats={state.allSelfReportedPoints}
      />
      <TickerCards
        config={tickersConfig}
        data={{
          confirmed: total_confirmed,
          deaths: total_deaths,
          recovered: total_recovered,
          selfReported: selfReported,
        }}
      />
    </>
  );
};
