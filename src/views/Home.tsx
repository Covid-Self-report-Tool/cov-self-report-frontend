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
  MapLayersPopout,
} from 'components';
import { getSubmittedCases } from 'utils/api';
import { useQuery } from 'react-query';

export const Home: FC = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const {
    total_confirmed,
    total_deaths,
    total_recovered,
  } = state.currentTotals;

  const { data: submissions, status } = useQuery(
    'submitted',
    getSubmittedCases,
    { staleTime: 300000 }
  );
  const [user, loading] = useAuthState(firebase.auth());

  if (status === 'error') {
    dispatch({
      type: 'TOGGLE_UI_ALERT',
      payload: {
        open: true,
        message: 'Could not get self-reported dataset',
        severity: 'error',
      },
    });
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
      <Box position="absolute" bottom={26} left={8} zIndex={1}>
        <SharingPopoutMenu />
      </Box>
      <Box position="absolute" bottom={66} left={8} zIndex={1}>
        <MapLayersPopout />
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
          selfReported: submissions && submissions.length,
        }}
      />
    </>
  );
};
