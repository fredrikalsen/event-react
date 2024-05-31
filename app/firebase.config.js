// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDT8WLethL6D17GwIyhLzKds-j4GLAC42w",
    authDomain: "event-bb7e9.firebaseapp.com",
    projectId: "event-bb7e9",
    storageBucket: "event-bb7e9.appspot.com",
    messagingSenderId: "864944223301",
    appId: "1:864944223301:web:4c358e3c28d07a137f9f2c"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export {db, storage}
