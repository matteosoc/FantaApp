import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Table, ListGroup, Button } from 'react-bootstrap';
import { getTeamDetails, getLeagueLeaderboard } from '../data/fetch'; // Funzioni per recuperare i dati
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../components/LeftArrow';
import PlayerDetailsList from '../components/PlayerDetailsList';
import LeagueLeaderboard from '../components/LeagueLeaderboard';




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
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <LeftArrow />
                    {/* Dettagli della squadra */}
                    <h3>Dettagli Squadra: {teamDetails.name}</h3>
                    <Card className="mb-4">
                        <Card.Header>
                            Risultato: {totalScore()} punti
                        </Card.Header>
                        <Card.Body>
                            <PlayerDetailsList players={teamDetails.players} />
                        </Card.Body>
                    </Card>

                    {/* Classifica della lega */}
                    <h3>Classifica della Lega</h3>
                    <LeagueLeaderboard leaderboard={leagueLeaderboard} />
                </Col>
            </Row>
        </Container >
    );
};

export default TeamDetails;