import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postBonusMalus } from "../data/fetch"; // Funzione che fa la POST dei bonus e malus
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import LeftArrow from '../components/LeftArrow';


const CreateBonusMalus = () => {
    const { leagueId } = useParams(); // Otteniamo il leagueId dai parametri dell'URL
    const { token } = useContext(AuthContext);

    const [allBonusMalus, setAllBonusMalus] = useState([{ name: "", value: 0, league: leagueId }]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Gestisce i cambiamenti nei campi del giocatore
    const handleBonusMalusChange = (index, e) => {
        const newBonusMalus = [...allBonusMalus];
        newBonusMalus[index][e.target.name] = e.target.value;
        setAllBonusMalus(newBonusMalus);
    };

    // Aggiunge un nuovo bonus/malus alla lista
    const addNewBonusMalus = () => {
        setAllBonusMalus([...allBonusMalus, { name: "", value: 0, league: leagueId }]);
    };

    // Gestisce l'invio dei dati al backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            for (const oneBonusMalus of allBonusMalus) {
                const response = await postBonusMalus(token, oneBonusMalus);

                if (response.error) {
                    setError(response.error);
                    return;
                }
            }

            if (window.confirm('Bonus/Malus creati, torna alla dashboard')) {
                navigate(`/dashboard`);
            }

        } catch (error) {
            setError("Errore durante l'invio dei bonus/malus");
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <LeftArrow />
                    <h1 className="mb-4">Inserisci Bonus e Malus per la Lega: {leagueId}</h1>
                    <Form onSubmit={handleSubmit}>
                        {allBonusMalus.map((bonusMalus, index) => (
                            <Row key={index} className="mb-3">
                                <Form.Group className="mb-2" controlId={`bonusMalusName-${index}`}>
                                    <Form.Label>Nome Bonus/Malus</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={bonusMalus.name}
                                        placeholder="Nome Bonus/Malus"
                                        onChange={(e) => handleBonusMalusChange(index, e)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId={`bonusMalusValue-${index}`}>
                                    <Form.Label>Valore</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="value"
                                        value={bonusMalus.value}
                                        placeholder="Valore"
                                        onChange={(e) => handleBonusMalusChange(index, e)}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                        ))}
                        <Button variant="secondary" type="button" onClick={addNewBonusMalus} className="me-2">
                            Aggiungi un altro bonus/malus
                        </Button>
                        <Button variant="primary" type="submit">
                            Salva la lega
                        </Button>
                    </Form>
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default CreateBonusMalus;