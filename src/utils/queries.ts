import { useQuery } from 'react-query';

import {
  getCountryGeoJSONData,
  getSubmittedCases,
  fetchGithubHtml,
} from 'utils/api';

const FIVE_MINUTES = 300000;

export const useCountryTotals = (dispatch: any) =>
  useQuery('countryTotals', getCountryGeoJSONData, {
    staleTime: FIVE_MINUTES,
    onError: error => {
      dispatch({
        type: 'TOGGLE_UI_ALERT',
        payload: {
          open: true,
          message: 'Could not get country totals',
          severity: 'error',
        },
      });
    },
  });

export const useSubmitted = (dispatch: any) =>
  useQuery('submitted', getSubmittedCases, {
    staleTime: FIVE_MINUTES,
    onError: error => {
      dispatch({
        type: 'TOGGLE_UI_ALERT',
        payload: {
          open: true,
          message: 'Could not get self-reported dataset',
          severity: 'error',
        },
      });
    },
  });

export const useAbout = (filename: string, dispatch: any) =>
  useQuery(filename, fetchGithubHtml, {
    staleTime: Infinity,
    onError: error => {
      dispatch({
        type: 'TOGGLE_UI_ALERT',
        payload: {
          open: true,
          message: 'Something went wrong. Could not get content.',
          severity: 'error',
        },
      });
    },
  });
