import { initializeApp } from "firebase/app";
// firestore
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBD9tmGaSR5nuE8OpfNQ5RnAamd3OSLh8Y",
  authDomain: "jolteon-3e8e7.firebaseapp.com",
  databaseURL: "https://jolteon-3e8e7.firebaseio.com",
  projectId: "jolteon-3e8e7",
  storageBucket: "jolteon-3e8e7.appspot.com",
  messagingSenderId: "873361559617",
  appId: "1:873361559617:web:a97a931cad76b5c0ccb6c0",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
