import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { attachCustomCommands } from 'cypress-firebase';
const firebaseConfig = require('serviceAccount.json');

// const firebaseConfig = {
//   apiKey: Cypress.env('REACT_APP_FIREBASE_API_KEY'),
//   authDomain: Cypress.env('REACT_APP_FIREBASE_AUTH_DOMAIN'),
//   databaseURL: Cypress.env('REACT_APP_FIREBASE_DATABASE_URL'),
//   projectId: Cypress.env('REACT_APP_FIREBASE_PROJECT_ID'),
//   storageBucket: Cypress.env('REACT_APP_FIREBASE_STORAGE_PROJECT'),
//   messagingSenderId: Cypress.env('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
//   appId: Cypress.env('REACT_APP_FIREBASE_APP_ID'),
//   measurementId: Cypress.env('REACT_APP_FIREBASE_MEASUREMENT_ID'),
// };

firebase.initializeApp(firebaseConfig);

attachCustomCommands({ Cypress, cy, firebase });
