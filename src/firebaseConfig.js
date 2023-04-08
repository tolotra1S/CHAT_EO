// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsoKcphLDoqh5BGuNx--nGmRnQ0e1S4lU",
  authDomain: "chat-eo-48ed7.firebaseapp.com",
  projectId: "chat-eo-48ed7",
  storageBucket: "chat-eo-48ed7.appspot.com",
  messagingSenderId: "460762265900",
  appId: "1:460762265900:web:69378bb891ddaaafab1489"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);