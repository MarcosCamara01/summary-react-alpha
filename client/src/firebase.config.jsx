import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClbIx6ojqzRV2ggwXsOYLFrz9kPqpXIes",
  authDomain: "summary-46fc0.firebaseapp.com",
  projectId: "summary-46fc0",
  storageBucket: "summary-46fc0.appspot.com",
  messagingSenderId: "768813193231",
  appId: "1:768813193231:web:613f0a75298a7954946b7a",
  measurementId: "G-EPQ1STS9GS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)