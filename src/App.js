import './App.css';

import React from "react";
import { useState } from "react";

import { Navbar, Form, Button, Modal } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import { auth } from "./firebase"
import firebase from 'firebase/app';
import {useAuthState} from 'react-firebase-hooks/auth';

import AddGame from "./components/AddGame";

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

  return <Button variant="outline-light" onClick={signInWithGoogle}>Sign In</Button>
}

function SignOut() {
  return <Button variant="outline-light" style={{marginLeft: 7}} onClick={() => auth.signOut()}>Sign Out</Button>
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

      <Navbar bg="secondary" variant="dark" expand="md">
        <Navbar.Brand href="#">MXDB</Navbar.Brand>
        <Navbar.Text>MaccouX DataBase</Navbar.Text>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="ml-auto">
            <Form.Control type="text" placeholder="Search for a game..." className="mr-sm-2" />
            {user && user.uid === 'psj3p9o9alTShS0GtjAvS91a29y1' ?
              <React.Fragment>
                <AddGame />
                <SignOut />
              </React.Fragment>
              : <SignIn handleShow={handleShow}/>}
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid>
        <Row>
          <Col>test</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
