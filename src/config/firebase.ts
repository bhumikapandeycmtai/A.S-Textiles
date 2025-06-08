import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsFv59CNYu-SV9XZ7bwqdnYX49xqRtRq4",
  authDomain: "ayraj-8d384.firebaseapp.com",
  projectId: "ayraj-8d384",
  storageBucket: "ayraj-8d384.firebasestorage.app",
  messagingSenderId: "794803658410",
  appId: "1:794803658410:web:7397c154a7af27c0b53ad3",
  measurementId: "G-2RG28QYKNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); 