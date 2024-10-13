import React, { useState, useEffect } from 'react';
import { joinLeague, createTeam, getMyLeagues } from '../data/fetch';
import { Container, Button, Card, ListGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { getMyTeams } from '../data/fetch';

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

    // // Funzione per iscriversi a una lega
    // const handleJoinLeague = async (leagueName, leaguePassword) => {
    //     const res = await joinLeague({ leagueName, leaguePassword });
    //     if (res.success) {
    //         alert('Iscritto alla lega con successo!');
    //         setPlayers(res.players); // Popola la lista dei giocatori della lega
    //         setIsJoined(true); // Imposta il flag a true per visualizzare CreateTeamForm
    //     } else {
    //         alert(res.error || 'Errore nell\'iscrizione alla lega');
    //     }
    // };

    // // Funzione per aggiornare il budget quando si seleziona un giocatore
    // const handleSelectPlayer = (player) => {
    //     setBudget(budget - player.value);
    // };

    // // Funzione per creare la squadra
    // const handleCreateTeam = async (teamName, selectedPlayers) => {
    //     const res = await createTeam({ teamName, players: selectedPlayers });
    //     if (res.success) {
    //         alert('Squadra creata con successo!');
    //     } else {
    //         alert(res.error || 'Errore nella creazione della squadra');
    //     }
    // };

    return (
        <div>
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
                                {team.name}
                                <Button
                                    variant="primary"
                                    className="ml-2"
                                    onClick={() => navigate(`/teams/${team._id}`)} // Navigazione alla pagina dei dettagli della lega
                                >
                                    Gestisci
                                </Button>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>Nessuna lega trovata.</ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </div>
    );
};

export default TeamOwnerDashboard;