import { useQuery } from 'react-query';

import {
  getCountryGeoJSONData,
  getSubmittedCases,
  getHtmlFromS3,
} from 'utils/api';

export const useCountryTotals = (dispatch: any) =>
  useQuery('countryTotals', getCountryGeoJSONData, {
    staleTime: 30000,
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
    staleTime: 30000,
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
  useQuery(filename, getHtmlFromS3, {
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
