// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhsj6YfawLro0Uf_Tge8Tgi6Z4vaiwzvo",
  authDomain: "code-review-682f7.firebaseapp.com",
  projectId: "code-review-682f7",
  storageBucket: "code-review-682f7.appspot.com",
  messagingSenderId: "687200146963",
  appId: "1:687200146963:web:ff22daa78a39ec658611e6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
