import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const CreateTeamForm = ({ players, budget, onSelectPlayer, onCreateTeam }) => {
    const [teamName, setTeamName] = useState('');
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const handleSelectPlayer = (player) => {
        if (selectedPlayers.includes(player)) return;
        if (budget >= player.value) {
            setSelectedPlayers([...selectedPlayers, player]);
            onSelectPlayer(player); // Aggiorna il budget
        } else {
            alert('Budget insufficiente per aggiungere questo giocatore.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateTeam(teamName, selectedPlayers);
    };

    return (
        <div>
            <h3>Seleziona i Giocatori per la tua Squadra</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Nome Squadra</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={teamName} 
                        onChange={(e) => setTeamName(e.target.value)} 
                        placeholder="Inserisci il nome della squadra" 
                    />
                </Form.Group>

                <h4>Budget rimanente: {budget}</h4>

                <ListGroup className="mb-3">
                    {players.map((player, index) => (
                        <ListGroup.Item key={index} onClick={() => handleSelectPlayer(player)}>
                            {player.name} - Valore: {player.value} €
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Button type="submit" variant="success">Crea Squadra</Button>

                <h4>Giocatori Selezionati</h4>
                <ListGroup>
                    {selectedPlayers.map((player, index) => (
                        <ListGroup.Item key={index}>
                            {player.name} - Valore: {player.value} €
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Form>
        </div>
    );
};

export default CreateTeamForm;