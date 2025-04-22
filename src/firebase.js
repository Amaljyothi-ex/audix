import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAuBrCX4ESvSmdMDKeq0LTk38MK7LbPIPE",
    authDomain: "breakglass-450806.firebaseapp.com",
    projectId: "breakglass-450806",
    storageBucket: "breakglass-450806.firebasestorage.app",
    messagingSenderId: "708394270600",
    appId: "1:708394270600:web:a486a73e3e1803b6db443d",
    measurementId: "G-26M5NHBW8S"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 