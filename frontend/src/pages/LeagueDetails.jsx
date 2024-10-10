import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Per ottenere l'ID della lega dalla URL
import { getLeagueDetails } from '../data/fetch'; // Funzione per chiamare l'API e ottenere i dettagli
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const LeagueDetails = () => {
  const { leagueId } = useParams(); // Ottieni l'ID della lega dalla URL
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const loadLeagueDetails = async () => {
      try {
        console.log('Fetching league details...');
        const leagueData = await getLeagueDetails(leagueId, token);
        setLeague(leagueData);
      } catch (err) {
        setError('Errore nel caricamento della lega.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Esegui il fetch solo se il token e il leagueId sono presenti
    if (leagueId && token) {
      loadLeagueDetails();
    }
  }, [leagueId, token]);


  if (loading) {
    return <div>Caricamento dettagli della lega...</div>;
  }

  if (!league) {
    return <div>Nessuna informazione disponibile per questa lega.</div>;
  }

  return (
    <Container>
      <h1>Dettagli della Lega: {league.name}</h1>

      {/* Dettagli principali della lega */}
      <Card className="my-3">
        <Card.Header>Informazioni</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Numero di partecipanti: {league.numberOfParticipants}</ListGroup.Item>
          <ListGroup.Item>Admin: {league.admin.name}</ListGroup.Item>
          {/* Aggiungi ulteriori dettagli se necessario */}
        </ListGroup>
      </Card>

      {/* Lista dei giocatori */}
      <Card className="my-3">
        <Card.Header>Players</Card.Header>
        <ListGroup variant="flush">
          {league.players.length > 0 ? (
            league.players.map((player) => (
              <ListGroup.Item key={player._id}>
                {player.name} - Punteggio: {player.value}
                <Button
                  onClick={() => navigate(`/players/${player._id}/apply-bonus`)} // Navigazione alla pagina dei dettagli della lega
                >
                  Assegna Bonus / Malus
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>Nessun giocatore nella lega.</ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      {/* Lista dei bonus/malus */}
      <Card className="my-3">
        <Card.Header>Bonus/Malus</Card.Header>
        <ListGroup variant="flush">
          {league.bonusMalus.length > 0 ? (
            league.bonusMalus.map((bonus) => (
              <ListGroup.Item key={bonus._id}>
                {bonus.name} - Valore: {bonus.value}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>Nessun bonus/malus assegnato.</ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      {/* Lista dei teams */}
      <Card className="my-3">
        <Card.Header>Teams</Card.Header>
        <ListGroup variant="flush">
          {league.teams.length > 0 ? (
            league.teams.map((team) => (
              <ListGroup.Item key={team._id}>
                {team.name}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>Nessuna squadra iscritta.</ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      <Button variant="primary" onClick={() => console.log('Gestisci i dettagli della lega')}>
        Modifica Lega
      </Button>
    </Container>
  );
};

export default LeagueDetails;