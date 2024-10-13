import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Alert, ListGroup, Button, Container, Row } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getPlayer } from '../data/fetch'; // Funzioni per recuperare i dati
import { useNavigate } from 'react-router-dom';


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
                {/* Pulsante per tornare indietro */}
                <Button variant="primary" onClick={() => navigate(-1)} className="mt-3">
                    Torna indietro
                </Button>
            <Row>
                <Card className="my-4">
                    <Card.Header>
                        <h2>Dettagli del Giocatore: {player.name}</h2>
                    </Card.Header>
                    <Card.Body>
                        <p><strong>Valore:</strong> {player.value}</p>
                        <p><strong>Punteggio:</strong> {player.score}</p>
                        <h5>Bonus Applicati:</h5>
                        {player.bonusesApplied && player.bonusesApplied.length > 0 ? (
                            <ListGroup>
                                {player.bonusesApplied.map((bonus, index) => (
                                    <ListGroup.Item key={index}>
                                        <strong>{bonus.name}</strong>: {bonus.value} punti
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>Nessun bonus applicato.</p>
                        )}
                    </Card.Body>
                </Card>
            </Row>
        </Container>

    );
};

export default PlayerDetails;
