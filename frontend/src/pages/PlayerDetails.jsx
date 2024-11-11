import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Alert, ListGroup, Col, Container, Row, Image, Stack } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getPlayer, deletePlayer } from '../data/fetch'; // Funzioni per recuperare i dati
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../components/LeftArrow';
import SpinnerComponent from '../components/spinner/Spinner'
import PlayerCard from '../components/PlayerCard';



const PlayerDetails = () => {
    const { playerId } = useParams(); // Recupera l'id del player dai parametri dell'URL
    const { token } = useContext(AuthContext); // Token di autenticazione
    const navigate = useNavigate();


    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Stato per il modal


    useEffect(() => {
        // Funzione per recuperare i dettagli del giocatore
        const fetchPlayerDetails = async () => {
            try {
                const data = await getPlayer(playerId, token);
                console.log(data) // Sostituisci con la tua API
                setPlayer(data);
            } catch (err) {
                setError('Errore nel recuperare i dettagli del giocatore');
            } finally {
                setLoading(false);
            }
        };

        fetchPlayerDetails();
    }, [playerId]);

    const calculateTotalScore = () => {
        if (player && player.bonusesApplied) {
            return player.bonusesApplied.reduce((total, bonus) => total + bonus.value, 0);
        }
        return 0;
    };

    if (loading) {
        return <SpinnerComponent />;
    }

    if (error) {
        return (
            <Alert variant="danger">
                {error}
            </Alert>
        );
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <LeftArrow />
                    <div>
                        <h5>Dettaglio del Giocatore</h5>
                        <PlayerCard player={player} />
                        <h5 className='mb-2'>Bonus Applicati</h5>
                        <div className='myCard p-3'>
                            {player.bonusesApplied && player.bonusesApplied.length > 0 ? (
                                <ListGroup className='mb-2' variant="flush">
                                    {player.bonusesApplied.map((bonus, index) => (
                                        <ListGroup.Item key={index}>
                                            <Stack direction="horizontal">
                                                <div>{index + 1}. {bonus.name}</div>
                                                <div className='ms-auto'>{bonus.value} punti</div>
                                            </Stack>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <div>
                                    <p>Nessun bonus applicato.</p>
                                </div>
                            )}
                            <ListGroup>
                                <ListGroup.Item>
                                    <Stack direction="horizontal" gap={3}>
                                        <div><strong>Punteggio totale</strong></div>
                                        <div className='ms-auto'><strong>{calculateTotalScore()} punti</strong></div>
                                    </Stack>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container >

    );
};

export default PlayerDetails;
