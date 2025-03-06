// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 

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

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // 🔥 storage 추가