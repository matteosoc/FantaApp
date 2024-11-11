import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Stack } from 'react-bootstrap';
import { getTeamDetails, getLeagueLeaderboard } from '../data/fetch'; // Funzioni per recuperare i dati
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../components/LeftArrow';
import PlayerDetailsList from '../components/PlayerDetailsList';
import LeagueLeaderboard from '../components/LeagueLeaderboard';
import SpinnerComponent from '../components/spinner/Spinner';




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
        return <SpinnerComponent />;
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
                    <div className='mb-4'>
                        <h5>Dettaglio squadra</h5>
                        <div className='myCard p-3 mb-4'>
                            <Stack direction="horizontal">
                                <div>
                                    <img
                                        src={teamDetails.teamImage ? teamDetails.teamImage : "/team-default.jpg"}
                                        className='thumbnail'
                                    />
                                </div>
                                <div className='ps-4'>
                                    <h1>{teamDetails.name}</h1>
                                </div>
                            </Stack>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <h5>Giocatori</h5>
                        <div className='myCard p-3'>
                            <PlayerDetailsList players={teamDetails.players} />
                            <ListGroup>
                                <ListGroup.Item>
                                    <Stack direction="horizontal" gap={3}>
                                        <div><strong>Punteggio totale</strong></div>
                                        <div className="ms-auto"><strong>{totalScore()} punti</strong></div>
                                    </Stack>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                    {/* Classifica della lega */}
                    <div>
                        <h5>Classifica della Lega</h5>
                        <LeagueLeaderboard leaderboard={leagueLeaderboard} />
                    </div>
                </Col>
            </Row>
        </Container >
    );
};

export default TeamDetails;