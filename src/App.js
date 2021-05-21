import logo from './logo.svg';
import './App.css';
import React from "react";
import firebase from "firebase";

function App() {
  const firebaseApp = firebase.apps[0];
  return (
    <div>
      <h1>React & Firebase</h1>
    </div>
  );
}

export default App;
