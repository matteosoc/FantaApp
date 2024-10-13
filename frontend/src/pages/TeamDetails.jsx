import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Table, ListGroup, Button } from 'react-bootstrap';
import { getTeamDetails, getLeagueLeaderboard } from '../data/fetch'; // Funzioni per recuperare i dati
import { useNavigate } from 'react-router-dom';


const TeamDetails = () => {
    const { teamId } = useParams(); // Recupera l'id del team dai parametri dell'URL
    const { token } = useContext(AuthContext); // Token di autenticazione
    const navigate = useNavigate();


    const [teamDetails, setTeamDetails] = useState(null);
    const [leagueLeaderboard, setLeagueLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const totalScore = function () {
        return teamDetails.players.reduce((total, player) => {
            return total + player.score;
        }, 0).toString();
    };


    useEffect(() => {
        // Funzione per recuperare i dettagli della squadra
        const fetchTeamDetails = async () => {
            try {
                console.log('Fetching teams details...');
                setLoading(true);
                const data = await getTeamDetails(teamId, token);
                setTeamDetails(data);
                console.log(data.league)
                // Recupera anche la classifica della lega
                const leaderboardData = await getLeagueLeaderboard(data.league, token);
                console.log(leaderboardData)
                setLeagueLeaderboard(leaderboardData);
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
            {/* Pulsante per tornare indietro */}
            <Button variant="primary" onClick={() => navigate(-1)} className="mt-3">
                Torna indietro
            </Button>
            <Row>
                {/* Dettagli della squadra */}
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Header>
                            <h3>Dettagli Squadra: {teamDetails.name}</h3>
                            <p>Risultato: {totalScore()} punti</p>
                        </Card.Header>
                        <Card.Body>
                            <h5>Giocatori e Punteggi</h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Giocatore</th>
                                        <th>Punteggio</th>
                                        <th>Bonus/Malus</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teamDetails.players.map((player, index) => (
                                        <tr key={index}>
                                            <td>{player.name}</td>
                                            <td>{player.score}</td>
                                            <td>
                                                {player.bonusesApplied.map((bonus, idx) => (
                                                    <div key={idx}>
                                                        {bonus.name}: {bonus.value}
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                <Button
                                                    onClick={() => navigate(`/players/${player._id}`)}
                                                >
                                                    Vedi giocatore
                                                </Button>
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
                    <Card className="mb-4">
                        <Card.Header>
                            <h5>Classifica della Lega</h5>
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {leagueLeaderboard.map((team, index) => (
                                    <ListGroup.Item key={index}>
                                        {index + 1}. {team.teamName} - {team.totalScore} punti
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TeamDetails;