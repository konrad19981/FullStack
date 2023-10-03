import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase";
import "firebase/firestore";
require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyCOWevKr5RDuyuG586SO3usm5jiAT7fE0g",
    authDomain: "tasks-5be7b.firebaseapp.com",
    projectId: "tasks-5be7b",
    storageBucket: "tasks-5be7b.appspot.com",
    messagingSenderId: "695189905250",
    appId: "1:695189905250:web:6628af18460128a49b963b"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db, firebase };

