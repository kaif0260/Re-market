import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0qcNMUJhkWf2s9JIe7pDhvIglXsi8XKM",
  authDomain: "re-market-cae93.firebaseapp.com",
  projectId: "re-market-cae93",
  storageBucket: "re-market-cae93.firebasestorage.app",
  messagingSenderId: "850340879885",
  appId: "1:850340879885:web:a4d15ba34ad95c9c18ff44",
  measurementId: "G-5V7E0W1MY4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();