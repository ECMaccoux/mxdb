import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAA0-FxovQP0mfokwXUeAmBg_8CsCdtHwc",
    authDomain: "maccoux-mxdb.firebaseapp.com",
    projectId: "maccoux-mxdb",
    storageBucket: "maccoux-mxdb.appspot.com",
    messagingSenderId: "545552041812",
    appId: "1:545552041812:web:6fba62750da9923ade6ac1",
    measurementId: "G-EFRDX1X9DG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export {auth, firestore, storage}