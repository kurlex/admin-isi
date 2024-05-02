import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoRrd1XqFDzGESHNDjfkBuRCQo863B4_Y",
  authDomain: "mobile-project-c0338.firebaseapp.com",
  projectId: "mobile-project-c0338",
  storageBucket: "mobile-project-c0338.appspot.com",
  messagingSenderId: "1054081298230",
  appId: "1:1054081298230:web:622fc85de8d472d5a88d97",
  measurementId: "G-6JEKQ9NLNW",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
