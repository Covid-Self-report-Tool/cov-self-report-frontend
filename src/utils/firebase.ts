import firebase from 'firebase/app';

export const signUp = async (email: string, password: string) => {
  await firebase
    .app()
    .auth()
    .createUserWithEmailAndPassword(email, password);
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