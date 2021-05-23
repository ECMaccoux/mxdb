import React from "react";
import { useState } from "react";

import { Button, Modal } from "react-bootstrap";

function DeleteGame(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <React.Fragment>
            <Button variant="danger" onClick={handleShow}>Delete</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you wish to delete {props.title} from your collection?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={() => {props.deleteGame(props.gameID); handleClose();}}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default DeleteGame;