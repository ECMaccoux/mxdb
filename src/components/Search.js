import React from "react";
import { useState, useEffect } from "react";
import { firestore } from "../firebase"

import { Row, Col } from "react-bootstrap";
import { Form, Table } from "react-bootstrap";

import SearchItem from "./SearchItem";

const gamesRef = firestore.collection("games");
const systemsRef = firestore.collection("systems");

function GetGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gamesRef.onSnapshot((snapshot) => {
            const newGames = snapshot.docs.sort().map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setGames(newGames);
        })
    }, []);
    return games;
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

function Search() {
    const [titleQuery, setTitleQuery] = useState("");
    const [systemQuery, setSystemQuery] = useState("");

    const games = GetGames();
    const systems = GetSystems();

    return (
        <React.Fragment>
            <Row style={{marginTop: 20}}>
                <Col md="8">
                    <Form>
                        <Form.Group controlId="search.title">
                            <Form.Control type="text" placeholder="Search for a game..." className="mr-sm-2" value={titleQuery} onChange={e => setTitleQuery(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Col>
                <Col md="4">
                    <Form>
                        <Form.Group controlId="search.system">
                            <Form.Control as="select" defaultValue={systemQuery} onChange={e => setSystemQuery(e.target.value)}>
                                <option key={-1} value={-1}>Select a system...</option>
                                {systems.map(system => <option key={system.id} value={system.id}>{system.name}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Table bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Console</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map(game => <SearchItem key={game.id} gameID={game.id} title={game.title} system={game.system.id} titleQuery={titleQuery} systemQuery={systemQuery} />)}
                    </tbody>
                </Table>
            </Row>
        </React.Fragment>
    )
}

export default Search;