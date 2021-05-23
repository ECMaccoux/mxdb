import React from "react";
import { useState, useEffect } from "react";
import { firestore } from "../firebase"

const systemsRef = firestore.collection("systems");

function renderSearchItem(title, system, titleQuery, systemQuery) {
    if(!titleQuery && !systemQuery) {
        return true;
    }

    const gameTitle = title.toLowerCase();
    
    return gameTitle.includes(titleQuery) && (system === systemQuery || systemQuery === "" || systemQuery === "-1");
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
            <td>{props.title}</td>
            <td>{systemName}</td>
        </tr>
    )
}

export default SearchItem;