import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA1rNYoA9WpqhIvYiXKOR_46lBb8OeM9fU",
  authDomain: "login-auth-3d3d7.firebaseapp.com",
  projectId: "login-auth-3d3d7",
  storageBucket: "login-auth-3d3d7.appspot.com",
  messagingSenderId: "706488208858",
  appId: "1:706488208858:web:42ed09c58f9f71f37184e3",
};

// ✅ SAFE initialization
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Auth instance
export const auth = getAuth(app);
