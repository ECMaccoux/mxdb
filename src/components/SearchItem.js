import React from "react";
import { useState, useEffect } from "react";

import { Button, Modal } from "react-bootstrap";

import { auth, firestore } from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';

const systemsRef = firestore.collection("systems");

function renderSearchItem(title, system, titleQuery, systemQuery) {
    if(!titleQuery && !systemQuery) {
        return true;
    }

    const gameTitle = title.toLowerCase();
    
    return gameTitle.includes(titleQuery.toLowerCase()) && (system === systemQuery || systemQuery === "" || systemQuery === "-1");
}

function SearchItem(props) {
    const [user] = useAuthState(auth);

    const [systemName, setSystemName] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const render = renderSearchItem(props.title, props.system, props.titleQuery, props.systemQuery)

    useEffect(() => {
        systemsRef.doc(props.system).get()
            .then(doc => {
                setSystemName(doc.data().name);
            })
    })

    return(
        <React.Fragment>
            <tr key={props.gameID} style={{display: (render ? "table-row" : "none")}}>
                <td style={{verticalAlign: "middle"}}>{props.title}</td>
                <td style={{verticalAlign: "middle"}}>{systemName}</td>
                {user && user.uid === 'psj3p9o9alTShS0GtjAvS91a29y1'
                    && <td style={{verticalAlign: "middle"}}><Button variant="danger" onClick={handleShow}>Delete</Button></td>}
            </tr>

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

export default SearchItem;