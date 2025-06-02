// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
      apiKey: "AIzaSyCkmBgqzSWx9TtW4GHVVk_ajo_FmL57O4U",
      authDomain: "xeno-860c7.firebaseapp.com",
      projectId: "xeno-860c7",
      storageBucket: "xeno-860c7.firebasestorage.app",
      messagingSenderId: "610098864284",
      appId: "1:610098864284:web:55e5e0f49b68213653cd59",
      measurementId: "G-B6BZRS84LD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };