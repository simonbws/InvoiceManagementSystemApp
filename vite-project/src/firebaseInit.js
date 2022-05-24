import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRLVNMqABwGCncqks42bDvzPz9PtPO4QI",
    authDomain: "invoices-75a47.firebaseapp.com",
    projectId: "invoices-75a47",
    storageBucket: "invoices-75a47.appspot.com",
    messagingSenderId: "56737719797",
    appId: "1:56737719797:web:343df6d12ac2724da66cbc"
  };

console.log("FIREBASE AUTH", firebase.auth)

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);





// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBRLVNMqABwGCncqks42bDvzPz9PtPO4QI",
//   authDomain: "invoices-75a47.firebaseapp.com",
//   projectId: "invoices-75a47",
//   storageBucket: "invoices-75a47.appspot.com",
//   messagingSenderId: "56737719797",
//   appId: "1:56737719797:web:343df6d12ac2724da66cbc"
// };