import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { getMyTeams } from '../data/fetch';
import Stack from 'react-bootstrap/Stack';
import SpinnerComponent from '../components/spinner/Spinner'
import RightArrow from './RightArrow';



const TeamOwnerDashboard = () => {
    const { token, userInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); // Stato per il caricamento
    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);

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

    if (loading) {
        return <SpinnerComponent />;
    }

    return (
        <Container >
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <div className='mb-3'>
                        <h1>Dashboard</h1>
                    </div>

                    {/* Lista delle leghe */}
                    <div>
                        <div className="mb-3">
                            <div className='mb-3'>
                                <Stack direction="horizontal" gap={3}>
                                    <h5 className='mb-0'>Le tue squadre</h5>
                                    {/* Crea nuova lega */}
                                    <div className="ms-auto">
                                        <Button className='btn-dark' as={Link} to="/join-league" size="sm">
                                            Iscriviti a una lega
                                        </Button>
                                    </div>
                                </Stack>
                            </div>

                            {/* Lista delle leghe */}
                            <div className='myCard'>
                                <ListGroup variant="flush">
                                    {teams.length > 0 ? (
                                        teams.map((team) => (
                                            <ListGroup.Item key={team._id}>
                                                <Stack direction="horizontal" gap={3}>
                                                    <div>{team.name}</div>
                                                    <button
                                                        variant="primary"
                                                        className="ms-auto"
                                                        size="sm"
                                                        onClick={() => navigate(`/teams/${team._id}`)} // Navigazione alla pagina dei dettagli della lega
                                                    >
                                                        <RightArrow />
                                                    </button>
                                                </Stack>
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <ListGroup.Item>Nessuna lega trovata.</ListGroup.Item>
                                    )}
                                </ListGroup>
                            </div>
                        </div>
                    </div>

                    
                </Col>
            </ Row>
        </Container>
    );
};

export default TeamOwnerDashboard;