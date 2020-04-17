import firebase from 'firebase/app';
import { DispatchFormType } from 'types/submission';
import { History } from 'history';

export const signUp = async (
  email: string,
  password: string,
  captcha: string
) => {
  // TODO verify captcha on backend
  await firebase
    .app()
    .auth()
    .createUserWithEmailAndPassword(email, password);
};

export const logOut = async (history: History, dispatch: DispatchFormType) => {
  await firebase
    .app()
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: 'RESET_USER_DATA' });
    });
  history.push('/');
};

export const login = async (email: string, password: string) => {
  await firebase
    .app()
    .auth()
    .signInWithEmailAndPassword(email, password);
};

export const googleLogin = async () => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(googleAuthProvider);
};

export const onAuthStateChange = (callback: Function) => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({ loggedIn: true });
    } else {
      callback({ loggedIn: false });
    }
  });
};
