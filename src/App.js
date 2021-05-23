import './App.css';

import React from "react";

import { Navbar, Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

import AddGame from "./components/AddGame";

// Colors: https://coolors.co/191923-fbfef9-ba1f33-7e7f9a-de3c4b

function App() {
  return (
    <div className="App">
      <Navbar bg="secondary" variant="dark" expand="md">
        <Navbar.Brand href="#">MXDB</Navbar.Brand>
        <Navbar.Text>MaccouX DataBase</Navbar.Text>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="ml-auto">
            <Form.Control type="text" placeholder="Search for a game..." className="mr-sm-2" />
            <AddGame />
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
