import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getLeagueDetails, createTeam } from '../data/fetch';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import LeftArrow from '../components/LeftArrow';
import AddButton from '../components/buttons/AddButton';
import RemoveButton from '../components/buttons/RemoveButton';

const CreateTeamPage = () => {
    const { leagueId } = useParams();  // Recupera leagueId dall'URL
    const { token } = useContext(AuthContext); // Token di autenticazione
    const navigate = useNavigate();

    const [league, setLeague] = useState(null); // Stato per la lega
    const [selectedPlayers, setSelectedPlayers] = useState([]); // Giocatori selezionati
    const [remainingBudget, setRemainingBudget] = useState(0); // Budget rimanente
    const [teamName, setTeamName] = useState(''); // Nome del team

    // Funzione per caricare i dati della lega
    useEffect(() => {
        const loadLeagueData = async () => {
            const leagueData = await getLeagueDetails(leagueId, token);
            setLeague(leagueData);
            setRemainingBudget(leagueData.budget); // Imposta il budget iniziale della lega
        };

        loadLeagueData();
    }, [leagueId, token]);

    // Funzione per gestire la selezione dei giocatori
    const handlePlayerSelect = (player) => {
        if (selectedPlayers.some(p => p._id === player._id)) {
            setSelectedPlayers(selectedPlayers.filter(p => p._id !== player._id));
            setRemainingBudget(remainingBudget + player.value); // Aggiungi il valore al budget
        } else {
            if (remainingBudget >= player.value) {
                setSelectedPlayers([...selectedPlayers, player]);
                setRemainingBudget(remainingBudget - player.value); // Sottrai il valore dal budget
            } else {
                alert("Budget insufficiente per selezionare questo giocatore.");
            }
        }
    };

    // Funzione per inviare il team creato
    const handleSubmit = async () => {
        if (!teamName) {
            alert('Inserisci un nome per la tua squadra!');
            return;
        }

        const newTeam = {
            name: teamName,
            players: selectedPlayers.map(p => p._id),
            budget: remainingBudget
        };

        try {
            await createTeam(leagueId, newTeam, token);
            alert('Squadra creata con successo!');
            navigate(`/dashboard`);
        } catch (error) {
            console.error('Errore nella creazione della squadra:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <LeftArrow />
                    <h2>Crea la tua squadra</h2>
                    {league && (
                        <div>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome Squadra</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="Inserisci il nome della tua squadra"
                                />
                            </Form.Group>

                            <div>
                                <h3>Seleziona Giocatori</h3>
                                <p>Budget disponibile: {remainingBudget} €</p>
                                <Card className="mb-4">
                                    <Card.Header>Giocatori disponibili</Card.Header>
                                    <ListGroup variant="flush">
                                        {league.players.map(player => (
                                            <ListGroup.Item
                                                key={player._id}
                                                className={`d-flex justify-content-between align-items-center ${selectedPlayers.includes(player) ? 'bg-success text-white' : ''}`}
                                                onClick={() => handlePlayerSelect(player)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div>
                                                    <strong>{player.name}</strong> 
                                                    <span className="ms-2">Valore: {player.value} €</span>
                                                </div>
                                                <button
                                                    variant={selectedPlayers.includes(player) ? 'danger' : 'primary'}
                                                    size="sm"
                                                >
                                                    {selectedPlayers.includes(player) ? <RemoveButton /> : <AddButton />}
                                                </button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card>
                            </div>

                            <Button onClick={handleSubmit} disabled={selectedPlayers.length === 0} variant="success">
                                Crea Squadra
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CreateTeamPage;
