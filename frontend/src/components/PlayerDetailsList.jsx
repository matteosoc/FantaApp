import React from 'react';
import { ListGroup, Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PlayerDetailsList = ({ players }) => {
    const navigate = useNavigate();

    return (
        <ListGroup className="mb-3" variant="flush">
            {players.map((player, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <Stack>
                        <div>{player.playerImage}</div>
                        <div><strong>{player.name}</strong></div>
                        <div className="text-muted">Punteggio: {player.score}</div>
                    </Stack>
                    <Button
                        variant="dark"
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