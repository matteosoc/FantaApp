import React, { useEffect, useState } from 'react';
import { Container, Button, Card, ListGroup } from 'react-bootstrap';
import { getMyLeagues } from '../data/fetch'; // Importiamo solo la funzione getLeagues
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';


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
    <Container>
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
                {league.name}
                <Button
                  variant="primary"
                  className="ml-2"
                  onClick={() => navigate(`/leagues/${league._id}`)} // Navigazione alla pagina dei dettagli della lega
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
    </Container>
  );
};

export default AdminDashboard;