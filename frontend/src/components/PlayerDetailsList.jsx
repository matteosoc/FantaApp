import React from 'react';
import { ListGroup, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PlayerDetailsList = ({ players }) => {
    const navigate = useNavigate();

    return (
        <ListGroup className="mb-3" variant="flush">
            {players.map((player, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center p-0">
                    <div>
                        <img
                            src={player.playerImage ? player.playerImage : "/player-default.jpg"}
                            className='thumbnail-small me-2'
                        />
                    </div>
                    <div>
                    <div><strong>{player.name}</strong></div>
                    <div className="text-muted">Punteggio: {player.score}</div>
                    </div>
                    <Button
                        className='ms-auto'
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