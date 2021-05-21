import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
