// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUPIAUFhEMpieQ1efiYjlH4097L7wtSIw",
  authDomain: "gaebalbadak.firebaseapp.com",
  projectId: "gaebalbadak",
  storageBucket: "gaebalbadak.firebasestorage.app",
  messagingSenderId: "643880875095",
  appId: "1:643880875095:web:41f0c2f10d999034a65f12",
  measurementId: "G-LS79ST4GQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);