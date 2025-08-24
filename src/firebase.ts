// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq9nl70ZzaGK8yGChjTZ5rTunsJVApa1o",
  authDomain: "formforge-4c452.firebaseapp.com",
  projectId: "formforge-4c452",
  storageBucket: "formforge-4c452.firebasestorage.app",
  messagingSenderId: "121950068749",
  appId: "1:121950068749:web:dbccec593be50907cff544"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);