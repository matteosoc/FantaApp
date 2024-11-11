import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useSearchParams } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { Button, Container, Row, Col } from "react-bootstrap";

import '../App.css';

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
    <Container className='p-5'>
      {!token &&
        <Row>
          <Col className='center'>
            <div className='triangle'></div>
            <div className='starburst'></div>
            <div className='square'></div>
            <div className='circle'></div>
            <div>
              <h1 className="mb-2">Benvenuto/a su FantaApp</h1>
              <p>Effettua il login o registrati per creare la tua FantaApp.</p>
            </div>
            <div>
              <Button variant="dark" className="me-3" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="light" onClick={() => navigate('/register')}>
                Registrati
              </Button>
            </div>
          </Col>
        </Row>
      }
      {token &&
        <Row>
          <Col className='center'>
            <div className='triangle'></div>
            <div className='starburst'></div>
            <div className='square'></div>
            <div className='circle'></div>
            <h1>Bentornato/a su FantaApp</h1>
            <div className="mt-5">
              <Button variant="dark" onClick={() => navigate('/dashboard')}>
                Vai alla dashboard
              </Button>
            </div>
          </Col>
        </Row>}
    </ Container>
  );
};

export default Home;