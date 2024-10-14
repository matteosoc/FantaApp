import React from 'react';
import { ListGroup, Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PlayerDetailsList = ({ players }) => {
    const navigate = useNavigate();

    return (
        <ListGroup variant="flush">
            {players.map((player, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <Stack>
                        <div><strong>{player.name}</strong></div>
                        <div className="text-muted">Punteggio: {player.score}</div>
                    </Stack>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/players/${player._id}`)}
                    >
                        Vedi giocatore
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default PlayerDetailsList;