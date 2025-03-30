// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvznimJawXjuKo6YlKsdLRqnGB5GDTTJ0",
  authDomain: "netflixgpt-a577c.firebaseapp.com",
  projectId: "netflixgpt-a577c",
  storageBucket: "netflixgpt-a577c.firebasestorage.app",
  messagingSenderId: "610745714272",
  appId: "1:610745714272:web:8127c63ec660ad63e4a505"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(); 