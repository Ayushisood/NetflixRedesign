// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR2T6LTAPWTrpgpXW20fl2zPRb0Alnq3Y",
  authDomain: "netflic-clone-yt-35b6f.firebaseapp.com",
  projectId: "netflic-clone-yt-35b6f",
  storageBucket: "netflic-clone-yt-35b6f.appspot.com",
  messagingSenderId: "348919254618",
  appId: "1:348919254618:web:a01bb1041d60c4ccb75263",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const products = collection(db, "products");
const users = collection(db, "users");

export default app;
export { db, auth, products, users };
