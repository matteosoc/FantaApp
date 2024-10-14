import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { createLeague } from '../data/fetch'; // Funzione per creare la lega
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LeftArrow from '../components/LeftArrow';


const CreateLeaguePage = () => {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([{ name: '', value: 0 }]);
    const [bonusMalus, setBonusMalus] = useState([{ name: '', value: 0 }]);
    const { token, userInfo } = useContext(AuthContext);

    const [leagueFormValue, setLeagueFormValue] = useState({
        name: '',
        password: '',
        numberOfParticipants: '',
        budget: '',
        players, // si possono eliminare?
        bonusMalus
    });

    const handleChange = (e) => {
        setLeagueFormValue({ ...leagueFormValue, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        console.log(token);
        console.log(leagueFormValue);

        try {
            const newLeague = await createLeague(leagueFormValue, token);

            // Redirect or success message after creation
            if (window.confirm('Lega creata, passa alla creazione dei players e bonusmalus')) {
                console.log(newLeague._id);
                navigate(`/create-players/${newLeague._id}`)
            };

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <LeftArrow />
                    <h2 className="mb-4">Crea una nuova Lega</h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="formleagueName">
                                    <Form.Label>Nome Lega</Form.Label>
                                    <Form.Control
                                        name="name"
                                        type="text"
                                        placeholder="Inserisci nome lega"
                                        value={leagueFormValue.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formpassword">
                                    <Form.Label>Password Lega</Form.Label>
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Inserisci una password"
                                        value={leagueFormValue.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                {/* Numero di partecipanti */}
                                <Form.Group className="mb-3" controlId="formNumberOfParticipants">
                                    <Form.Label>Numero di Partecipanti</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="numberOfParticipants"
                                        placeholder="Inserisci il numero di partecipanti"
                                        value={leagueFormValue.numberOfParticipants}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                {/* Budget per creare la squadra */}
                                <Form.Group className="mb-3" controlId="budget">
                                    <Form.Label>Budget</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="budget"
                                        placeholder="Inserisci il budget per creare la squadra"
                                        value={leagueFormValue.budget}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Button onClick={handleSubmit} variant="primary">
                                    Crea Lega
                                </Button>
                            </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateLeaguePage;