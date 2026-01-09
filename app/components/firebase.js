// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA1rNYoA9WpqhIvYiXKOR_46lBb8OeM9fU",
  authDomain: "login-auth-3d3d7.firebaseapp.com",
  projectId: "login-auth-3d3d7",
  storageBucket: "login-auth-3d3d7.firebasestorage.app",
  messagingSenderId: "706488208858",
  appId: "1:706488208858:web:42ed09c58f9f71f37184e3",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ CORRECT: getAuth
const auth = getAuth(app);

export { auth };
