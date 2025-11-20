// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKSYeX0DmTBcIFTbbgfS3C7jHC6V5fsEU",
  authDomain: "partyclub-staff.firebaseapp.com",
  projectId: "partyclub-staff",
  storageBucket: "partyclub-staff.firebasestorage.app",
  messagingSenderId: "699385832052",
  appId: "1:699385832052:web:3b72347d0b949c14f0e721",
  measurementId: "G-PD1LMQPLME"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
