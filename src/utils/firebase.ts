import firebase from 'firebase/app';
import { DispatchFormType, GlobalContextDispatchType } from 'context/types';
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

export const logOut = async (
  history: History,
  userDispatch: DispatchFormType,
  globalDispatch: GlobalContextDispatchType
) => {
  await firebase
    .app()
    .auth()
    .signOut();

  userDispatch({ type: 'RESET_USER_DATA' });

  // Go home
  history.push('/');

  // Show success msg to user
  globalDispatch({
    type: 'TOGGLE_UI_ALERT',
    payload: {
      open: true,
      message: 'You are now logged out',
      severity: 'success',
    },
  });
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

export const facebookLogin = async () => {
  const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
  await firebase.auth().signInWithPopup(facebookAuthProvider);
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
