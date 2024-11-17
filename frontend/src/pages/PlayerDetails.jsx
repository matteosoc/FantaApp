import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Alert, ListGroup, Col, Container, Row, Button, Stack } from 'react-bootstrap';
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

    const handleDeletePlayer = async () => {
        const result = await deletePlayer(playerId, token);
        if (!result.error) {
            // Operazione completata con successo
            alert('Giocatore eliminato con successo.');
            navigate(-1); // Torna indietro di una pagina  
        } else {
            // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
            alert(result.error);
        }
    };

    const confirmDelete = () => {
        handleDeletePlayer();
        setShowModal(false); // Chiudi il modal dopo la conferma
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
                        <div className='myCard p-3 mb-4'>
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

                    <Button className='w-100' variant="outline-dark" onClick={() => setShowModal(true)}>
                        Elimina giocatore
                    </Button>

                    {/* Modal di conferma per l'eliminazione del giocatore */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Conferma Eliminazione</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Sei sicuro di voler eliminare questo giocatore? Questa azione non può essere annullata.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={() => setShowModal(false)}>
                                Annulla
                            </Button>
                            <Button variant="light" onClick={confirmDelete}>
                                Elimina
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    
                </Col>
            </Row>
        </Container >

    );
};

export default PlayerDetails;
