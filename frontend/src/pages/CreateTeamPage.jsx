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
    const [image, setImage] = useState([null]); // Stato per le immagini


    // Funzione per caricare i dati della lega
    useEffect(() => {
        const loadLeagueData = async () => {
            const leagueData = await getLeagueDetails(leagueId, token);

            if (!leagueData) {
                alert('Lega non trovata.');
                navigate('/dashboard');
                return;
            }

            setLeague(leagueData);
            setRemainingBudget(leagueData.budget || 0);  // Imposta il budget iniziale della lega
        };

        loadLeagueData();
    }, [leagueId, token]);

    // Gestisce il caricamento dell'immagine
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

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
        try {
            if (!teamName) {
                alert('Inserisci un nome per la tua squadra!');
                return;
            }

            const newTeam = new FormData()
            newTeam.append("teamImage", image)
            newTeam.append("name", teamName);
            selectedPlayers.forEach(player => newTeam.append("players", player._id));
            newTeam.append("budget", remainingBudget);

            console.log(newTeam)

            await createTeam(leagueId, newTeam, token);

            alert('Squadra creata con successo!');

            navigate(`/dashboard`);
        } catch (error) {
            console.log('Errore nella creazione della squadra:', error);
            alert('Si è verificato un errore durante la creazione della squadra. Riprova più tardi.');
        }
    };


    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <LeftArrow />
                    <h2 className="mb-3">Crea la tua squadra</h2>
                    {league && (
                        <div>
                            <Form.Group className="mb-2">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="Inserisci il nome della tua squadra"
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId={`teamImage`}>
                                <Form.Label>Logo</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="teamImage"
                                    onChange={handleImageChange}
                                />
                            </Form.Group>

                            <div>
                                <h3 className="mb-2">Seleziona Giocatori</h3>
                                <p>Budget disponibile: {remainingBudget} €</p>
                                <div className="myCard p-3 mb-4">
                                    <ListGroup variant="flush">
                                        {league.players.map(player => (
                                            <ListGroup.Item
                                                key={player._id}
                                                className={`d-flex justify-content-between align-items-center ${selectedPlayers.includes(player) ? 'bg-dark text-white' : ''}`}
                                                onClick={() => handlePlayerSelect(player)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div>
                                                    <strong>{player.name}</strong>
                                                    <span className="ms-2">Valore: {player.value} €</span>
                                                </div>
                                                <button
                                                    variant={selectedPlayers.includes(player) ? 'danger' : 'dark'}
                                                    size="sm"
                                                >
                                                    {selectedPlayers.includes(player) ? <RemoveButton /> : <AddButton />}
                                                </button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            </div>

                            <Button className='w-100' onClick={handleSubmit} disabled={selectedPlayers.length === 0} variant="dark">
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
