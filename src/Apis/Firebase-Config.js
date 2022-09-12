import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyB1HQ5X5l9nhMZIBQZQqLdz1ZLFf58fWXc",
  authDomain: "task-app-995d0.firebaseapp.com",
  projectId: "task-app-995d0",
  storageBucket: "task-app-995d0.appspot.com",
  messagingSenderId: "552409511426",
  appId: "1:552409511426:web:3ce1eecdd30465df40591b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
