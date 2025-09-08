import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLd4m1gbcDAQSun7EZxEvxgmF_6UHB87o",
  authDomain: "netflix--clone-5147c.firebaseapp.com",
  projectId: "netflix--clone-5147c",
  storageBucket: "netflix--clone-5147c.appspot.com",
  messagingSenderId: "1037007245848",
  appId: "1:1037007245848:web:ed1342adcf10c0f26d296d",
  measurementId: "G-D46RYWYGPE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
