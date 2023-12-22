// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmihwyx87kPLY8FsfbCb89xyPDnljkriY",
  authDomain: "task-management-9b469.firebaseapp.com",
  projectId: "task-management-9b469",
  storageBucket: "task-management-9b469.appspot.com",
  messagingSenderId: "1015964740141",
  appId: "1:1015964740141:web:e91eed8560353c1fb1a6a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;