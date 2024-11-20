// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2wUgxKnQBV7HwhQaTFtiCIyyimVGB5rY",
    authDomain: "meal-finder-xd.firebaseapp.com",
    projectId: "meal-finder-xd",
    storageBucket: "meal-finder-xd.firebasestorage.app",
    messagingSenderId: "946171624648",
    appId: "1:946171624648:web:9fb70848aaef473f3339fd",
    measurementId: "G-J07D6MXWBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);