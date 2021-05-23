import './css/App.css';

import React from "react";
import { useState } from "react";

import { Navbar, Button, Modal } from "react-bootstrap";
import { Container } from "react-bootstrap";

import { auth } from "./firebase"
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

import AddGame from "./components/AddGame";
import Search from "./components/Search";

// Colors: https://coolors.co/191923-fbfef9-ba1f33-7e7f9a-de3c4b

function SignIn(props) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(() => {
      let currentUser = auth.currentUser;
      if(currentUser.uid !== 'psj3p9o9alTShS0GtjAvS91a29y1') {
        currentUser.delete();
        
        props.handleShow();
      }
    });
  }

  return <Button variant="outline-light" style={{marginLeft: 7}} className="ml-auto" onClick={signInWithGoogle}>Sign In</Button>
}

function SignOut() {
  return <Button variant="outline-light" onClick={() => auth.signOut()}>Sign Out</Button>
}

function App() {
  const [showNotEric, setShowNotEric] = useState(false);
  const [user] = useAuthState(auth);

  const handleClose = () => setShowNotEric(false);
  const handleShow = () => setShowNotEric(true);

  return (
    <div className="App">
      <Modal show={showNotEric} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>You're not Eric!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Feel free to peruse the collection, but you won't be able to touch anything...</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Navbar className="navbar" bg="secondary" variant="dark" expand="md">
        <Navbar.Brand href="#"><img alt="MXDB logo" src="main-transparent-white.png" height='30px' className='pb-1 mr-2' /></Navbar.Brand>
        <Navbar.Text>MaccouX DataBase</Navbar.Text>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && user.uid === 'psj3p9o9alTShS0GtjAvS91a29y1' 
            ? <React.Fragment>
                <AddGame />
                <SignOut />
              </React.Fragment>
            : <SignIn handleShow={handleShow}/>}
        </Navbar.Collapse>
      </Navbar>

      <Container>
        <Search />
      </Container>
    </div>
  );
}

export default App;
