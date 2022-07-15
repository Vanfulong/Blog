// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBhRSX7xUaILXK6Aro-NDq5IsvmUA2ZHb8',
  authDomain: 'blog-77c93.firebaseapp.com',
  projectId: 'blog-77c93',
  storageBucket: 'blog-77c93.appspot.com',
  messagingSenderId: '245082324933',
  appId: '1:245082324933:web:a39916df60c2b499ff55ac',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth();
