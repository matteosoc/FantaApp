import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { getMyTeams } from '../data/fetch';
import Stack from 'react-bootstrap/Stack';


const TeamOwnerDashboard = () => {
    const { token, userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); // Stato per il caricamento
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);




    // const [players, setPlayers] = useState([]);
    // const [budget, setBudget] = useState(100); // Budget iniziale
    // const [isJoined, setIsJoined] = useState(false); // Flag per verificare se l'utente è iscritto alla lega

    // Effettua il fetch delle leghe in cui è iscritto il teamOwner
    useEffect(() => {
        const loadTeams = async () => {
            try {
                const myTeams = await getMyTeams(token);
                console.log(myTeams)
                setTeams(myTeams || []); // Assicurati che sia sempre un array
            } catch (error) {
                console.error('Errore nel caricamento delle leghe:', error);
            } finally {
                setLoading(false); // Fine del caricamento
            }
        };
        loadTeams();
    }, [token]);

    return (
        <Container >
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1>TeamOwner Dashboard</h1>

                    {/* Join a league */}
                    {<Button as={Link} to="/join-league" variant="primary" className="my-3">
                        Iscriviti a una lega
                    </Button>
                    }

                    <Card className="my-3">
                        <Card.Header>Le tue teams</Card.Header>
                        <ListGroup variant="flush">
                            {teams.length > 0 ? (
                                teams.map((team) => (
                                    <ListGroup.Item key={team._id}>
                                        <Stack direction="horizontal" gap={3}>
                                            <div>{team.name}</div>
                                            <Button
                                                variant="primary"
                                                className="ml-2 ms-auto"
                                                size="sm"
                                                onClick={() => navigate(`/teams/${team._id}`)} // Navigazione alla pagina dei dettagli della lega
                                            >
                                                Gestisci
                                            </Button>
                                        </Stack>
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <ListGroup.Item>Nessuna lega trovata.</ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </ Row>
        </Container>
    );
};

export default TeamOwnerDashboard;