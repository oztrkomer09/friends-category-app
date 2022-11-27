import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBwwHpzva-BKBhjC8_G_xWWdWZS0T6EebE",
  authDomain: "friends-category-app.firebaseapp.com",
  projectId: "friends-category-app",
  storageBucket: "friends-category-app.appspot.com",
  messagingSenderId: "990102099740",
  appId: "1:990102099740:web:4bbea194ce9d8f7ebe0cd9",
  measurementId: "G-6EY0NXK5SG",
});

const db = firebaseApp.firestore();

export default db;
