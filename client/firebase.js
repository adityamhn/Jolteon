// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBD9tmGaSR5nuE8OpfNQ5RnAamd3OSLh8Y",
  authDomain: "jolteon-3e8e7.firebaseapp.com",
  projectId: "jolteon-3e8e7",
  storageBucket: "jolteon-3e8e7.appspot.com",
  messagingSenderId: "873361559617",
  appId: "1:873361559617:web:a97a931cad76b5c0ccb6c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
