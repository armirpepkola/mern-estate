// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3b396.firebaseapp.com",
  projectId: "mern-estate-3b396",
  storageBucket: "mern-estate-3b396.appspot.com",
  messagingSenderId: "294340441618",
  appId: "1:294340441618:web:e8a5adc9857f40d26e4acb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);