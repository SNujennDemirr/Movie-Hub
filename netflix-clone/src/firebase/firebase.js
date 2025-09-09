// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLd4m1gbcDAQSun7EZxEvxgmF_6UHB87o",
  authDomain: "netflix--clone-5147c.firebaseapp.com",
  projectId: "netflix--clone-5147c",
  storageBucket: "netflix--clone-5147c.firebasestorage.app",
  messagingSenderId: "1037007245848",
  appId: "1:1037007245848:web:ed1342adcf10c0f26d296d",
  measurementId: "G-D46RYWYGPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);