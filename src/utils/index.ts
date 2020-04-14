import firebase from 'firebase/app';
import { History } from 'history';

import { GeoJSONData } from 'types/api';

export const prettyPrint = (value: number) => {
  if (value === undefined) {
    return 'N/A';
  }

  return value.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
  });
};

export const logOut = async (history: History) => {
  await firebase
    .app()
    .auth()
    .signOut();
  history.push('/');
};

// For the ticker card totals...
export const calculateTotals = (
  data: GeoJSONData,
  initial: {
    total_confirmed: number;
    total_deaths: number;
    total_recovered: number;
  }
) => {
  return data.reduce((sums, thisOne: any) => {
    const { properties } = thisOne;
    const { total_confirmed, total_deaths, total_recovered } = properties;

    return {
      total_confirmed: sums.total_confirmed + (total_confirmed || 0),
      total_deaths: sums.total_deaths + (total_deaths || 0),
      total_recovered: sums.total_recovered + (total_recovered || 0),
    };
  }, initial);
};
