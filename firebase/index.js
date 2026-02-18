// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAJgesrKC4Z1PJW-dI27hreS3qaqwDHoI",
  authDomain: "quran-academy-628b8.firebaseapp.com",
  projectId: "quran-academy-628b8",
  storageBucket: "quran-academy-628b8.firebasestorage.app",
  messagingSenderId: "611347443893",
  appId: "1:611347443893:web:b4df6c99ca5ba12bef0efc",
  measurementId: "G-2QL2249FLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);