// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ5GXszHVLswCqYroYzepmJMqs1MJ4DWY",
  authDomain: "universal-ram.firebaseapp.com",
  projectId: "universal-ram",
  storageBucket: "universal-ram.appspot.com",
  messagingSenderId: "581434696412",
  appId: "1:581434696412:web:70e0274328942938d24a19",
  measurementId: "G-PD6KL4RVX2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
getAnalytics(app);
export const auth = getAuth(app);

export default db;
