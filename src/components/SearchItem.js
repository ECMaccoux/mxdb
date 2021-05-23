import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { firestore } from "../firebase"

const systemsRef = firestore.collection("systems");

function renderSearchItem(title, system, titleQuery, systemQuery) {
    if(!titleQuery && !systemQuery) {
        return true;
    }

    const gameTitle = title.toLowerCase();
    
    return gameTitle.includes(titleQuery.toLowerCase()) && (system === systemQuery || systemQuery === "" || systemQuery === "-1");
}

function SearchItem(props) {
    const [systemName, setSystemName] = useState("");

    const render = renderSearchItem(props.title, props.system, props.titleQuery, props.systemQuery)

    useEffect(() => {
        systemsRef.doc(props.system).get()
            .then(doc => {
                setSystemName(doc.data().name);
            })
    })

    return(
        <tr key={props.gameID} style={{display: (render ? "table-row" : "none")}}>
            <td style={{verticalAlign: "middle"}}>{props.title}</td>
            <td style={{verticalAlign: "middle"}}>{systemName}</td>
            <td style={{verticalAlign: "middle"}}><Button variant="danger" onClick={() => props.deleteGame(props.gameID)}>Delete</Button></td>
        </tr>
    )
}

export default SearchItem;