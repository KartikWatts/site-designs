// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

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
