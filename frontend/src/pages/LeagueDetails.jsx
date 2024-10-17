import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Per ottenere l'ID della lega dalla URL
import { getLeagueDetails, deleteLeague } from '../data/fetch'; // Funzione per chiamare l'API e ottenere i dettagli
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import LeftArrow from '../components/LeftArrow';
import Badge from 'react-bootstrap/Badge';
import RightArrow from '../components/RightArrow';
import SpinnerComponent from '../components/spinner/Spinner'


const LeagueDetails = () => {
  const { leagueId } = useParams(); // Ottieni l'ID della lega dalla URL
  const { token } = useContext(AuthContext);

  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Stato per il modal
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

  const handleDeleteLeague = async () => {
    const result = await deleteLeague(leagueId, token);
    if (!result.error) {
      // Operazione completata con successo
      alert('Lega eliminata con successo.');
      navigate(-1); // Torna indietro di una pagina  
    } else {
      // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
      alert(result.error);
    }
  };

  // Funzione per confermare l'eliminazione della lega
  const confirmDelete = () => {
    handleDeleteLeague();
    setShowModal(false); // Chiudi il modal dopo la conferma
  };

  if (loading) {
    return <SpinnerComponent />;
  }

  if (!league) {
    return <div>Nessuna informazione disponibile per questa lega.</div>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <LeftArrow />
          <h1>Dettagli della Lega: {league.name}</h1>

          {/* Dettagli principali della lega */}
          <Card className="my-3">
            <Card.Header>Informazioni</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Numero di partecipanti: {league.numberOfParticipants}</ListGroup.Item>
              <ListGroup.Item>Budget: {league.budget}</ListGroup.Item>
              <ListGroup.Item>Admin: {league.admin.name}</ListGroup.Item>
              <ListGroup.Item>Password: {league.password}</ListGroup.Item>
            </ListGroup>
          </Card>

          {/* Lista dei giocatori */}
          <Card className="my-3">
            <Card.Header>Players</Card.Header>
            <ListGroup variant="flush">
              {league.players.length > 0 ? (
                league.players.map((player) => (
                  <ListGroup.Item key={player._id}>
                    <Stack direction="horizontal" gap={3}>
                      <div>{player.name}</div>
                      <Badge
                        pill
                        bg="primary"
                        onClick={() => navigate(`/players/${player._id}/apply-bonus`, { state: { leagueId } })} // Navigazione alla pagina dei dettagli della lega
                      >
                        <button>Assegna Bonus/Malus</button>
                      </Badge>
                      <button className='ms-auto' onClick={() => navigate(`/players/${player._id}`)}><RightArrow /></button>
                    </Stack>
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
                    <Stack direction="horizontal" gap={3}>
                      <div>{bonus.name}</div>
                      <button className='ms-auto' onClick={() => navigate(`/bonus-malus/${bonus._id}`)}><RightArrow /></button>
                    </Stack>
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
                    <Stack direction="horizontal" gap={3}>
                      <div>{team.name}</div>
                      <button className='ms-auto' onClick={() => navigate(`/teams/${team._id}`)}><RightArrow /></button>
                    </Stack>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>Nessuna squadra iscritta.</ListGroup.Item>
              )}
            </ListGroup>
          </Card>

          <Button variant="danger" onClick={() => setShowModal(true)}>
            Elimina Lega
          </Button>

          {/* Modal di conferma per l'eliminazione della lega */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Conferma Eliminazione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Sei sicuro di voler eliminare questo bonus? Questa azione non può essere annullata.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Annulla
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Elimina
              </Button>
            </Modal.Footer>
          </Modal>

        </Col>
      </Row>
    </Container>
  );
};

export default LeagueDetails;