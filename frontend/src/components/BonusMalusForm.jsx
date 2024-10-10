import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const BonusMalusForm = ({ league, onAssign }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedBonusMalus, setSelectedBonusMalus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign(selectedPlayer, selectedBonusMalus);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Seleziona Giocatore</Form.Label>
        <Form.Control 
          as="select" 
          value={selectedPlayer} 
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          {league.players.map(player => (
            <option key={player._id} value={player._id}>{player.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Seleziona Bonus/Malus</Form.Label>
        <Form.Control 
          as="select" 
          value={selectedBonusMalus} 
          onChange={(e) => setSelectedBonusMalus(e.target.value)}
        >
          {league.bonusMalus.map(bonusMalus => (
            <option key={bonusMalus._id} value={bonusMalus._id}>
              {bonusMalus.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">Assegna Bonus/Malus</Button>
    </Form>
  );
};

export default BonusMalusForm;