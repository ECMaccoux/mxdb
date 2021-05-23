import React from "react";
import { useState, useEffect } from "react";

import { Row, Col } from "react-bootstrap";
import { Button, Modal, Form } from "react-bootstrap";

import { firestore } from "../firebase"

const gamesRef = firestore.collection("games");
const systemsRef = firestore.collection("systems");

function editGameToDB(gameID, title, system, setValidated, callback) {
    const form = document.getElementById('editGame.form')
    setValidated(true);
    if (form.checkValidity() === false) {
        return;
    }

    gamesRef.doc(gameID).update({
        title: title,
        system: firestore.doc("systems/" + system)
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });;

    setValidated(false);
    callback();
}

function GetSystems() {
    const [systems, setSystems] = useState([]);

    useEffect(() => {
        systemsRef.onSnapshot((snapshot) => {
            const newSystems = snapshot.docs.sort().map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setSystems(newSystems);
        })
    }, []);
    return systems;
}

function EditGame(props) {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const systems = GetSystems();
    const handleKeyPress = (event) => {
        if(event.key === "Enter") {
            handleEditGame();
        }
    }
    const handleEditGame = () => {
        editGameToDB(props.game.id, document.getElementById("editGame.title").value, document.getElementById("editGame.system").value, setValidated, () => {
            setShow(false);
        });
    }

    return(
        <React.Fragment>
            <Button variant="outline-dark" style={{marginRight: 7}} onClick={handleShow}>Edit</Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} onKeyPress={handleKeyPress} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Game</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Form noValidate validated={validated} id="editGame.form">
                        <Form.Group as={Row} controlId="editGame.title">
                            <Form.Label column sm="2">Title</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Title" defaultValue={props.game.title} required />
                                <Form.Control.Feedback type="invalid">
                                    The title of your game is required.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="editGame.system">
                            <Form.Label column sm="2">System</Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" defaultValue={props.game.system.id} required>
                                    {systems.map(system => <option key={system.id} value={system.id}>{system.name}</option>)}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    The game's system is required.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>Cancel</Button>
                    <Button variant="dark" onClick={handleEditGame}>Edit</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default EditGame;