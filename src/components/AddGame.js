import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Button, Modal, Form } from "react-bootstrap";
import { firestore } from "../firebase"

const gamesRef = firestore.collection("games");
const systemsRef = firestore.collection("systems");

function addGameToDB(title, system, setValidated, callback) {
    const form = document.getElementById('addGame.form')
    setValidated(true);
    if (form.checkValidity() === false) {
        return;
    }

    gamesRef.add({
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
                ... doc.data()
            }));
            setSystems(newSystems);
        })
    }, []);
    return systems;
}
 
function AddGame() {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const systems = GetSystems();

    return (
        <div>
            <Button variant="danger" onClick={handleShow}>Add</Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Game</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form noValidate validated={validated} id="addGame.form">
                        <Form.Group as={Row} controlId="addGame.title">
                            <Form.Label column sm="2">Title</Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Title" required />
                                <Form.Control.Feedback type="invalid">
                                    The title of your game is required.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="addGame.system">
                            <Form.Label column sm="2">System</Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" required>
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
                    <Button variant="outline-danger" onClick={handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={e => {
                        addGameToDB(document.getElementById("addGame.title").value, document.getElementById("addGame.system").value, setValidated, () => {
                            setShow(false);
                        });
                    }}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddGame;
