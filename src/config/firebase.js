// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCl03UUuexqSyLHmjErYnvKu-nMAe2s_C0",
  authDomain: "test-project-anciem.firebaseapp.com",
  projectId: "test-project-anciem",
  storageBucket: "test-project-anciem.firebasestorage.app",
  messagingSenderId: "176874233319",
  appId: "1:176874233319:web:78cc99e7d910ffd15bb142",
  measurementId: "G-Y78QGJ49PG"
};

// Initialize Firebase
const firebaseDb = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseDb;