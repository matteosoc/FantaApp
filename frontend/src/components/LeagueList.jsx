import React from 'react';
import { ListGroup, Table } from 'react-bootstrap';

const LeagueList = ({ leagues }) => {
    return (
        <div>
            <h3>Le Mie Leghe</h3>
            <ListGroup>
                {leagues.map((league, index) => (
                    <ListGroup.Item key={index}>
                        <h4>{league.name}</h4>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Squadra</th>
                                    <th>Punti</th>
                                </tr>
                            </thead>
                            <tbody>
                                {league.teams.map((team, i) => (
                                    <tr key={i}>
                                        <td>{team.name}</td>
                                        <td>{team.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default LeagueList;