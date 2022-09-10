import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfpDkCsJlUF5X5_5Wm9wqSPg8Dgm1iigo",
  authDomain: "gas-up-v1.firebaseapp.com",
  projectId: "gas-up-v1",
  storageBucket: "gas-up-v1.appspot.com",
  messagingSenderId: "631663249356",
  appId: "1:631663249356:web:04457e6389c5b07580ff69",
  measurementId: "G-TZ3S9PM14W",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export default app;
