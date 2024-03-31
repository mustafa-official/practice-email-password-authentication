// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRMFxqGxFU8QDabSNkuk_WhDoyYYM9DkY",
    authDomain: "practice-email-pass-auth-7f0e7.firebaseapp.com",
    projectId: "practice-email-pass-auth-7f0e7",
    storageBucket: "practice-email-pass-auth-7f0e7.appspot.com",
    messagingSenderId: "819644007576",
    appId: "1:819644007576:web:13c129a12cab6bf1affced"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth