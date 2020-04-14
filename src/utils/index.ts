import firebase from 'firebase/app';
import { History } from 'history';

import { IGeoJson } from 'types';
import { CountriesFieldsForTotals } from 'types/context';

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
// export const calculateTotals = (
//   data: [],
//   initial: CountriesFieldsForTotals
// ) => {
//   return data.reduce((sums, thisOne: IGeoJson) => {
//     const { properties } = thisOne;
//     const { confirmed, deaths, recovered } = properties;

//     return {
//       confirmed: sums.confirmed + (confirmed || 0),
//       deaths: sums.deaths + (deaths || 0),
//       recovered: sums.recovered + (recovered || 0),
//     };
//   }, initial);
// };
