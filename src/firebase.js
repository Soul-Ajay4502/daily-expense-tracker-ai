import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "dailyexpensetracker-b5a15.firebaseapp.com",
    projectId: "dailyexpensetracker-b5a15",
    storageBucket: "dailyexpensetracker-b5a15.appspot.com",
    messagingSenderId: "1044139199411",
    appId: "1:1044139199411:web:4cbc608d956463281799c6",
    measurementId: "G-9B1RV5SGFY"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

export { auth, provider, db };
