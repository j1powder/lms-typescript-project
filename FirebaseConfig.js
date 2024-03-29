// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

// variable from .env.local file
  apiKey: process.env.NEXT_PUBLIC_FIRESTORE_API,
  authDomain: process.env.NEXT_PUBLIC_FIRESTORE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRESTORE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIRESTORE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRESTORE_MESSAGING_SENDER,
  appId: process.env.NEXT_PUBLIC_FIRESTORE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const projectFirestore = getFirestore(app);
export const projectAuth = getAuth(app);