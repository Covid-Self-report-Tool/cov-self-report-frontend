import firebase from 'firebase/app';
import { History } from 'history';

export const prettyPrint = (value: number) => {
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
