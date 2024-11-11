import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postPlayer } from "../data/fetch"; // Funzione che fa la POST dei giocatori
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import LeftArrow from '../components/LeftArrow';

const CreatePlayersPage = () => {
    const { leagueId } = useParams();
    const { token } = useContext(AuthContext);

    const [players, setPlayers] = useState([{ name: "", value: 0, league: leagueId }]);
    const [allImages, setAllImages] = useState([null]); // Stato per le immagini
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Gestisce il caricamento dell'immagine
    const handlePlayerChange = (index, e) => {
        const newPlayers = [...players];
        newPlayers[index][e.target.name] = e.target.value;
        setPlayers(newPlayers);
    };


    // Gestisce il caricamento dell'immagine
    const handleImageChange = (index, e) => {
        const newImages = [...allImages];
        newImages[index] = e.target.files[0];
        setAllImages(newImages);
    };

    // Aggiunge un nuovo player alla lista
    const addNewPlayer = () => {
        setPlayers([...players, { name: "", value: 0, image: null, league: leagueId }]);
        setAllImages([...allImages, null]); // Aggiunge uno spazio per la nuova immagine
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            for (let i = 0; i < players.length; i++) {
                const formData = new FormData();
                formData.append("name", players[i].name);
                formData.append("value", players[i].value);
                formData.append("league", players[i].league);
                if (allImages[i]) {
                    formData.append("playerImage", allImages[i]); // Aggiunge l'immagine al formData
                }

                const response = await postPlayer(token, formData);

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
                    <h1 className="mb-2">Crea i Giocatori</h1>

                    <Form onSubmit={handleSubmit}>
                        {players.map((player, index) => (
                            <Row key={index} className="mb-4">
                                <Form.Group className="mb-2" controlId={`playerName-${index}`}>
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
                                <Form.Group className="mb-2" controlId={`playerValue-${index}`}>
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
                                <Form.Group className="mb-2" controlId={`playerImage-${index}`}>
                                    <Form.Label>Immagine giocatore</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="playerImage"
                                        onChange={(e) => handleImageChange(index, e)}
                                    />
                                </Form.Group>
                            </Row>
                        ))}
                        <Button variant="light" type="button" onClick={addNewPlayer} className="mb-2 w-100">
                            Aggiungi un altro giocatore
                        </Button>
                        <Button variant="dark" type="submit" className="w-100">
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