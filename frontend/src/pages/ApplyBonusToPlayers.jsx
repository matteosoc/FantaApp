import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getBonusMalus, applyBonusToPlayer, getPlayer } from '../data/fetch';
import LeftArrow from '../components/LeftArrow';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';

const ApplyBonusPage = () => {
    const { playerId } = useParams(); // Recupera playerId dai parametri URL
    const { token } = useContext(AuthContext);
    const location = useLocation();
    const leagueId = location.state?.leagueId; // Recupera il leagueId dallo state passato tramite navigate
    const navigate = useNavigate(); // Per navigare a altre pagine
    const [allBonusMalus, setBonuses] = useState([]); // Stato per i bonus/malus
    const [selectedBonus, setSelectedBonus] = useState(''); // Stato per il bonus selezionato
    const [selectedPlayer, setselectedPlayer] = useState(''); // Stato per il bonus selezionato


    useEffect(() => {
        if (!leagueId) {
            console.error('League ID non trovato!');
            return;
        }

        const loadPlayerInfo = async () => {
            const loadedPlayer = await getPlayer(playerId, token);
            setselectedPlayer(loadedPlayer);
        };

        const loadBonusMalus = async () => {
            const loadedBonuses = await getBonusMalus(leagueId, token);
            setBonuses(loadedBonuses);
        };
        loadPlayerInfo()
        loadBonusMalus();
    }, [leagueId, token]);

    const handleBonusApplication = async () => {
        try {
            const applyBonusMalus = await applyBonusToPlayer(playerId, token, selectedBonus);
            alert('Bonus/Malus applicato con successo!');
            navigate(-1); // Torna indietro alla schermata precedente
        } catch (error) {
            alert(`Errore nell'applicazione del Bonus/Malus: ${error.message}`);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-4">
                <Col md={6}>
                    <LeftArrow />
                    <h2 className="mb-3">Applica Bonus/Malus al Giocatore: {selectedPlayer.name}</h2>

                    <Form className="mb-4">
                        <Form.Group controlId="selectBonus">
                            <Form.Label>Seleziona Bonus/Malus:</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedBonus}
                                onChange={(e) => setSelectedBonus(e.target.value)}
                            >
                                <option value="">-- Seleziona un Bonus/Malus --</option>
                                {allBonusMalus.map((bonus) => (
                                    <option key={bonus._id} value={bonus._id}>
                                        {bonus.name} ({bonus.value > 0 ? `+${bonus.value}` : bonus.value})
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button
                        variant="primary"
                        onClick={handleBonusApplication}
                        disabled={!selectedBonus}
                        className="mt-3 w-100"
                    >
                        Applica Bonus/Malus
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ApplyBonusPage;