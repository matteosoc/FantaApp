import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Link, useSearchParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { Button, Container, Row, Col } from "react-bootstrap";



const Home = () => {
  const navigate = useNavigate();

  const { token, setToken } = useContext(AuthContext)

  let [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    // cerca il token tra i params
    console.log(searchParams.get('token'))

    if (searchParams.get('token')) {
      localStorage.setItem('token', searchParams.get('token'))
      setToken(searchParams.get('token'))// aggiorna il token nello stato del contesto
    }
  }, [])

  return (
    <Container className='mt-5'>
      {!token &&
        <Row>
          <Col md={8}>
            <h1>Benvenuto/a su FantaApp</h1>
            <p>Effettua il login o registrati per partecipare al gioco</p>
            <div className="mt-5">
              <Button className="btn-primary me-3" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button className="btn-secondary" onClick={() => navigate('/register')}>
                Registrati
              </Button>
            </div>
          </Col>
        </Row>
      }
      {token &&
        <Row>
          <Col md={8}>
          <h1>Bentornato su FantaApp</h1>
          <div className="mt-5">
            <button className="btn btn-primary me-3" onClick={() => navigate('/dashboard')}>
              Vai alla dashboard
            </button>
          </div>
          </Col>
        </Row>}
    </ Container>
  );
};

export default Home;