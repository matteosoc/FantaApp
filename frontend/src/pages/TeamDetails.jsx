import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Table, ListGroup } from 'react-bootstrap';
import { getTeamDetails, getLeagueRanking } from '../data/fetch'; // Funzioni per recuperare i dati

const TeamDetails = () => {
    const { teamId } = useParams(); // Recupera l'id del team dai parametri dell'URL
    const { token } = useContext(AuthContext); // Token di autenticazione

    const [teamDetails, setTeamDetails] = useState(null);
    // const [leagueRanking, setLeagueRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Funzione per recuperare i dettagli della squadra
        const fetchTeamDetails = async () => {
            try {
                console.log('Fetching teams details...');
                setLoading(true);
                const data = await getTeamDetails(teamId, token);
                setTeamDetails(data);
                // Recupera anche la classifica della lega
                // const ranking = await getLeagueRanking(data.leagueId);
                // setLeagueRanking(ranking);
            } catch (err) {
                setError('Errore nel recupero dei dettagli della squadra.');
            } finally {
                setLoading(false);
            }
        };

        fetchTeamDetails();
    }, [teamId, token]);

    if (loading) {
        return <p>Caricamento in corso...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Container>
            <Row>
                {/* Dettagli della squadra */}
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Header>
                            <h3>Dettagli Squadra: {teamDetails.name}</h3>
                            <p>Risultato: {teamDetails.result} punti</p>
                        </Card.Header>
                        <Card.Body>
                            <h5>Giocatori e Punteggi</h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Giocatore</th>
                                        <th>Punteggio</th>
                                        <th>Bonus/Malus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teamDetails?.players.map((player, index) => (
                                        <tr key={index}>
                                            <td>{player.name}</td>
                                            <td>{player.score}</td>
                                            <td>
                                                {player.bonusApplied.map((bonus, idx) => (
                                                    <div key={idx}>
                                                        {bonus.name}: {bonus.value}
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Classifica della lega */}
                <Col md={4}>
                    {/* <Card className="mb-4">
                        <Card.Header>
                            <h5>Classifica della Lega</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {leagueRanking.map((team, index) => (
                                    <ListGroup.Item key={index}>
                                        {index + 1}. {team.name} - {team.points} punti
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card> */}
                </Col>
            </Row>
        </Container>
    );
};

export default TeamDetails;