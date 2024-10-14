import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { getMyLeagues } from '../data/fetch'; // Importiamo solo la funzione getLeagues
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';



const AdminDashboard = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const { token, userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch leagues on load
  useEffect(() => {
    const loadLeagues = async () => {
      try {
        const adminLeagues = await getMyLeagues(token);
        console.log(adminLeagues)
        setLeagues(adminLeagues || []); // Assicurati che sia sempre un array
      } catch (error) {
        console.error('Errore nel caricamento delle leghe:', error);
      } finally {
        setLoading(false); // Fine del caricamento
      }
    };
    loadLeagues();
  }, [token]);

  if (loading) {
    return <div>Caricamento leghe...</div>; // Spinner o messaggio di caricamento
  }

  return (
    <Container >
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Admin Dashboard</h1>

          {/* Button to navigate to create league page */}
          <Button as={Link} to="/createLeague" variant="primary" className="my-3">
            Crea una nuova Lega
          </Button>

          {/* List of leagues */}
          <Card className="my-3">
            <Card.Header>Le tue Leghe</Card.Header>
            <ListGroup variant="flush">
              {leagues.length > 0 ? (
                leagues.map((league) => (
                  <ListGroup.Item key={league._id}>
                    <Stack direction="horizontal" gap={3}>
                    <div>{league.name}</div>
                    <Button
                      variant="primary"
                      className="ml-2 ms-auto"
                      size="sm"
                      onClick={() => navigate(`/leagues/${league._id}`)} // Navigazione alla pagina dei dettagli della lega
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

export default AdminDashboard;