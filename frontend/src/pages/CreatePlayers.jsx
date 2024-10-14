import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postPlayer } from "../data/fetch"; // Funzione che fa la POST dei giocatori
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import LeftArrow from '../components/LeftArrow';


const CreatePlayersPage = () => {
    const { leagueId } = useParams(); // Otteniamo il leagueId dai parametri dell'URL
    const { token, userInfo } = useContext(AuthContext);

    const [players, setPlayers] = useState([{ name: "", value: 0, league: leagueId }]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handlePlayerChange = (index, e) => {
        const newPlayers = [...players];
        newPlayers[index][e.target.name] = e.target.value;
        setPlayers(newPlayers);
    };

    const addNewPlayer = () => {
        setPlayers([...players, { name: "", value: 0, league: leagueId }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            for (const player of players) {
                const response = await postPlayer(token, player);

                if (response.error) {
                    setError(response.error);
                    return;
                }
            }

            if (window.confirm('Giocatori creati, passa alla creazione dei bonusmalus')) {
                navigate(`/create-bonus-malus/${leagueId}`);
            }

        } catch (error) {
            setError("Errore durante l'invio dei giocatori");
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <LeftArrow />
                    <h1 className="mb-4">Crea i Giocatori per la Lega: {leagueId}</h1>
                    <Form onSubmit={handleSubmit}>
                        {players.map((player, index) => (
                            <Row key={index} className="mb-4">
                                <Form.Group className="mb-1" controlId={`playerName-${index}`}>
                                    <Form.Label>Nome giocatore {index + 1}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={player.name}
                                        placeholder="Nome giocatore"
                                        onChange={(e) => handlePlayerChange(index, e)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId={`playerValue-${index}`}>
                                    <Form.Label>Valore</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="value"
                                        value={player.value}
                                        placeholder="Valore"
                                        onChange={(e) => handlePlayerChange(index, e)}
                                        required
                                        min={0}
                                    />
                                </Form.Group>
                            </Row>
                        ))}
                        <Button variant="secondary" type="button" onClick={addNewPlayer} className="me-2">
                            Aggiungi un altro giocatore
                        </Button>
                        <Button variant="primary" type="submit">
                            Salva Giocatori e Continua
                        </Button>
                    </Form>
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default CreatePlayersPage;