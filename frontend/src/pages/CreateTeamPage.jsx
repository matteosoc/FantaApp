import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getLeagueDetails, createTeam } from '../data/fetch';
import { Form, Button, Card } from 'react-bootstrap';

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
        // Controlla se il giocatore è già stato selezionato
        if (selectedPlayers.some(p => p._id === player._id)) {
            // Se il giocatore è già selezionato, rimuovilo
            setSelectedPlayers(selectedPlayers.filter(p => p._id !== player._id));
            setRemainingBudget(remainingBudget + player.value); // Aggiungi il valore al budget
        } else {
            // Se il giocatore non è stato selezionato, aggiungilo
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
            players: selectedPlayers.map(p => p._id), // Solo gli id dei giocatori
            budget: remainingBudget
        };

        console.log("prima di await createTeam")

        console.log("teamName", newTeam)
        console.log("leagueId", leagueId)
        console.log("token", token)

        try {
            await createTeam(leagueId, newTeam, token);
            alert('Squadra creata con successo!');
            navigate(`/teams/${leagueId}`); // Naviga alla pagina della squadra
        } catch (error) {
            console.error('Errore nella creazione della squadra:', error);
        }
    };

    return (
        <div>
            <h2>Crea la tua squadra</h2>
            {league && (
                <div>
                    <p>Budget disponibile: {remainingBudget} €</p>
                    <Form.Group>
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
                        <div className="player-list">
                            {league.players.map(player => (
                                <Card key={player._id} className={`player-card ${selectedPlayers.includes(player) ? 'selected' : ''}`}>
                                    <Card.Body>
                                        <Card.Title>{player.name}</Card.Title>
                                        <Card.Text>Valore: {player.value} €</Card.Text>
                                        <Button variant="primary" onClick={() => handlePlayerSelect(player)}>
                                            {selectedPlayers.includes(player) ? 'Rimuovi' : 'Aggiungi'}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <Button onClick={handleSubmit} disabled={selectedPlayers.length === 0} variant="success">
                        Crea Squadra
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CreateTeamPage;