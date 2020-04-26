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
import { getSubmittedCases, getCountryGeoJSONData } from 'utils/api';
import { useQuery } from 'react-query';
import { calculateTotals } from 'utils';

export const Home: FC = () => {
  const { state, dispatch } = useContext(GlobalContext);

  let [totalConfirmed, totalDeaths, totalRecovered] = [0, 0, 0];

  const { data: submissions, status: statusSubmissions } = useQuery(
    'submitted',
    getSubmittedCases,
    { staleTime: 300000 }
  );
  const {
    data: countryTotals,
    status: countryTotalsStatus,
  } = useQuery('countryTotals', getCountryGeoJSONData, { staleTime: 300000 });

  const [user, loading] = useAuthState(firebase.auth());

  if (statusSubmissions === 'error') {
    dispatch({
      type: 'TOGGLE_UI_ALERT',
      payload: {
        open: true,
        message: 'Could not get self-reported dataset',
        severity: 'error',
      },
    });
  }

  if (countryTotalsStatus === 'error') {
    dispatch({
      type: 'TOGGLE_UI_ALERT',
      payload: {
        open: true,
        message: 'Could not country data',
        severity: 'error',
      },
    });
  }

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
        data={countryTotals || []}
        submittedFeats={submissions}
      />
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
