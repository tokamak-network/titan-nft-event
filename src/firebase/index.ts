// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_apiKey,
  authDomain: process.env.NEXT_PUBLIC_FB_authDomain,
  databaseURL: process.env.NEXT_PUBLIC_FB_databaseURL,
  projectId: process.env.NEXT_PUBLIC_FB_projectId,
  storageBucket: process.env.NEXT_PUBLIC_FB_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_messagingSenderIdy,
  appId: process.env.NEXT_PUBLIC_FB_appId,
  measurementId: process.env.NEXT_PUBLIC_FB_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
