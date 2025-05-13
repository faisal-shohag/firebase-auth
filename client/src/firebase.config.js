// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVHnpVRnwNXABaIrsGWcoz24ZhUGJS9sk",
  authDomain: "fir-auth-d763b.firebaseapp.com",
  projectId: "fir-auth-d763b",
  storageBucket: "fir-auth-d763b.firebasestorage.app",
  messagingSenderId: "224137394925",
  appId: "1:224137394925:web:9fe5393776b8f587c12ae4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)