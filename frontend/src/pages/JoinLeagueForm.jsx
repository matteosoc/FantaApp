import React, { useState } from 'react';
import { joinLeague } from '../data/fetch';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import LeftArrow from '../components/LeftArrow';




const JoinLeagueForm = () => {
    const [leagueName, setLeagueName] = useState('');
    const [leaguePassword, setLeaguePassword] = useState('');
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [leagueForm, setLeagueForm] = useState({
        name: "",
        password: ""
    });

    const handleChange = (e) => {
        setLeagueForm({ ...leagueForm, [e.target.name]: e.target.value });
        console.log(leagueForm)
    };

    const handleSubmit = async () => {
        console.log(leagueForm)


        try {
            const response = await joinLeague(leagueForm, token);

            console.log("la risposta: ", response)

            // Se la risposta è positiva, reindirizza alla pagina di creazione della squadra
            if (response.leagueId) {
                alert('Continua con la creazione della squadra')
                navigate(`/leagues/${response.leagueId}/create-team`);
            }

        } catch (err) {
            console.log('Errore durante l\'iscrizione alla lega:', err);
            alert('Errore durante l\'iscrizione alla lega, riprova.');
        }

    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <LeftArrow />
                    <h3 className="mb-3">Iscriviti a una Lega</h3>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome Lega</Form.Label>
                            <Form.Control
                                name="name"
                                type="text"
                                value={leagueForm.name}
                                onChange={handleChange}
                                placeholder="Inserisci il nome della lega"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Password Lega</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                value={leagueForm.password}
                                onChange={handleChange}
                                placeholder="Inserisci la password della lega"
                            />
                        </Form.Group>

                        <Button className='w-100' onClick={handleSubmit} variant="dark">Iscriviti</Button>
                    </Form>
                </Col>
            </Row>
        </Container >
    );
};

export default JoinLeagueForm;