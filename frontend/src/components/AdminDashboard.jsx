import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { getMyLeagues } from '../data/fetch'; // Importiamo solo la funzione getLeagues
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import SpinnerComponent from '../components/spinner/Spinner'
import RightArrow from './RightArrow';



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
                  <h5 className='mb-0'>Le tue Leghe</h5>
                  {/* Crea nuova lega */}
                  <div className="ms-auto">
                    <Button className='btn-dark' as={Link} to="/createLeague" size="sm">
                      Crea nuova
                    </Button>
                  </div>
                </Stack>
              </div>

              {/* Lista delle leghe */}
              <div className='myCard'>
                <ListGroup variant="flush">
                  {leagues.length > 0 ? (
                    leagues.map((league) => (
                      <ListGroup.Item key={league._id}>
                        <Stack direction="horizontal" gap={3}>
                          <div>{league.name}</div>
                          <button
                            variant="primary"
                            className="ms-auto"
                            size="sm"
                            onClick={() => navigate(`/leagues/${league._id}`)} // Navigazione alla pagina dei dettagli della lega
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

export default AdminDashboard;