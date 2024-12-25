// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN-Aep0C1zLMS8AjOJOVWtmiHY-ZS7vXI",
  authDomain: "autantication-89cbd.firebaseapp.com",
  projectId: "autantication-89cbd",
  storageBucket: "autantication-89cbd.firebasestorage.app",
  messagingSenderId: "221308736173",
  appId: "1:221308736173:web:e155056fece3438083ec24",
  measurementId: "G-LCGMBRFSKQ"
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export{auth}