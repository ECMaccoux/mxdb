import React from "react";
import { useState, useEffect } from "react";

import { Button, Modal } from "react-bootstrap";

import { auth, firestore } from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth';

import DeleteGame from './DeleteGame';

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
                    && <td style={{verticalAlign: "middle"}}>
                        <Button variant="outline-dark" style={{marginRight: 7}} onClick={handleShow}>Edit</Button>
                        <DeleteGame gameID={props.gameID} deleteGame={props.deleteGame} />
                    </td>}
            </tr>
        </React.Fragment>
    )
}

export default SearchItem;