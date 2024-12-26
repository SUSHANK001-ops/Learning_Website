// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCN-Aep0C1zLMS8AjOJOVWtmiHY-ZS7vXI",
  authDomain: "autantication-89cbd.firebaseapp.com",
  projectId: "autantication-89cbd",
  storageBucket: "autantication-89cbd.appspot.com", // Make sure this is exactly as shown in Firebase console
  messagingSenderId: "221308736173",
  appId: "1:221308736173:web:e155056fece3438083ec24",
  measurementId: "G-LCGMBRFSKQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);



export { app, auth, storage };