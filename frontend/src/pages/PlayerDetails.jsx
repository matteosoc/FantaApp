import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Alert, ListGroup, Col, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getPlayer } from '../data/fetch'; // Funzioni per recuperare i dati
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../components/LeftArrow';


const PlayerDetails = () => {
    const { playerId } = useParams(); // Recupera l'id del player dai parametri dell'URL
    const { token } = useContext(AuthContext); // Token di autenticazione
    const navigate = useNavigate();


    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Caricamento in corso...</span>
                </Spinner>
            </div>
        );
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
                    <h2>Dettagli del Giocatore: {player.name}</h2>
                    <Card className="my-4">
                        <Card.Header>
                            <h5>Valore: {player.value}</h5>
                        </Card.Header>
                        <Card.Body>
                            <h5 className='mb-2'>Bonus Applicati:</h5>
                            {player.bonusesApplied && player.bonusesApplied.length > 0 ? (
                                <ListGroup className='mb-3'>
                                    {player.bonusesApplied.map((bonus, index) => (
                                        <ListGroup.Item key={index}>
                                            <strong>{bonus.name}</strong>: {bonus.value} punti
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>

                            ) : (
                                <p>Nessun bonus applicato.</p>
                            )}
                            <h5>Punteggio: {player.score}</h5>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >

    );
};

export default PlayerDetails;
