// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "@firebase/firestore";
import { getAuth } from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi-iKA9Xime-Nnhjd1f3xavRtrd6LaFIM",
  authDomain: "crud-fire-react-57ea7.firebaseapp.com",
  projectId: "crud-fire-react-57ea7",
  storageBucket: "crud-fire-react-57ea7.appspot.com",
  messagingSenderId: "1092259491338",
  appId: "1:1092259491338:web:0219c34ca7c49e35b7b9f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);