// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8SVuOMiBPu6FoR3ArXTt7diSGWqMeA-I",
  authDomain: "shoppingsavingscalculator.firebaseapp.com",
  projectId: "shoppingsavingscalculator",
  storageBucket: "shoppingsavingscalculator.appspot.com",
  messagingSenderId: "573829662889",
  appId: "1:573829662889:web:8632662b437212ed6dc1b8",
  measurementId: "G-31MRC74F8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase;